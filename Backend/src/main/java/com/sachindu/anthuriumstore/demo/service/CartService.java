package com.sachindu.anthuriumstore.demo.service;

import com.sachindu.anthuriumstore.demo.domain.enums.CartStatus;
import com.sachindu.anthuriumstore.demo.domain.model.*;
import com.sachindu.anthuriumstore.demo.repository.*;
import com.sachindu.anthuriumstore.demo.web.dto.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            UserRepository userRepository,
            PlantRepository plantRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
    }

    @Transactional
    public CartResponse getMyCart() {
        User user = currentUser();
        Cart cart = getOrCreateActiveCart(user);
        return toResponse(cart);
    }

    @Transactional
    public CartResponse addItem(AddCartItemRequest req) {
        User user = currentUser();
        Cart cart = getOrCreateActiveCart(user);

        Plant plant = plantRepository.findById(req.plantId())
                .orElseThrow(() -> new IllegalArgumentException("Plant not found: " + req.plantId()));

        if (Boolean.FALSE.equals(plant.getIsActive())) {
            throw new IllegalArgumentException("Plant is not available");
        }

        int requestedQty = req.qty();
        int available = plant.getStockQty() == null ? 0 : plant.getStockQty();
        if (requestedQty > available) {
            throw new IllegalArgumentException("Not enough stock. Available: " + available);
        }

        CartItem item = cartItemRepository.findByCartIdAndPlantId(cart.getId(), plant.getId())
                .orElse(null);

        Instant now = Instant.now();

        if (item == null) {
            item = CartItem.builder()
                    .cart(cart)
                    .plant(plant)
                    .qty(requestedQty)
                    .unitPriceCents(plant.getPriceCents())
                    .createdAt(now)
                    .updatedAt(now)
                    .build();
            cart.getItems().add(item);
        } else {
            int newQty = item.getQty() + requestedQty;
            if (newQty > available) {
                throw new IllegalArgumentException("Not enough stock for total qty. Available: " + available);
            }
            item.setQty(newQty);
            item.setUpdatedAt(now);
        }

        cart.setUpdatedAt(now);
        cartRepository.save(cart);

        return toResponse(cart);
    }

    @Transactional
    public CartResponse updateItemQty(Long itemId, UpdateCartItemQtyRequest req) {
        User user = currentUser();
        Cart cart = getOrCreateActiveCart(user);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found: " + itemId));

        int qty = req.qty();
        if (qty == 0) {
            cart.getItems().remove(item); // orphanRemoval=true deletes it
            cart.setUpdatedAt(Instant.now());
            cartRepository.save(cart);
            return toResponse(cart);
        }

        Plant plant = item.getPlant();
        int available = plant.getStockQty() == null ? 0 : plant.getStockQty();
        if (qty > available) {
            throw new IllegalArgumentException("Not enough stock. Available: " + available);
        }

        item.setQty(qty);
        item.setUpdatedAt(Instant.now());
        cart.setUpdatedAt(Instant.now());
        cartRepository.save(cart);

        return toResponse(cart);
    }

    @Transactional
    public CartResponse removeItem(Long itemId) {
        User user = currentUser();
        Cart cart = getOrCreateActiveCart(user);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found: " + itemId));

        cart.getItems().remove(item);
        cart.setUpdatedAt(Instant.now());
        cartRepository.save(cart);

        return toResponse(cart);
    }

    private Cart getOrCreateActiveCart(User user) {
        return cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Instant now = Instant.now();
                    Cart c = Cart.builder()
                            .user(user)
                            .status(CartStatus.ACTIVE)
                            .createdAt(now)
                            .updatedAt(now)
                            .build();
                    return cartRepository.save(c);
                });
    }

    private CartResponse toResponse(Cart cart) {
        var items = cart.getItems().stream().map(i -> {
            int line = i.getQty() * i.getUnitPriceCents();
            return new CartItemResponse(
                    i.getId(),
                    i.getPlant().getId(),
                    i.getPlant().getName(),
                    i.getQty(),
                    i.getUnitPriceCents(),
                    line
            );
        }).toList();

        int total = items.stream().mapToInt(CartItemResponse::lineTotalCents).sum();

        return new CartResponse(cart.getId(), items, total);
    }
}
