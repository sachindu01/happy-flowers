package com.sachindu.anthuriumstore.demo.service;

import com.sachindu.anthuriumstore.demo.domain.enums.CartStatus;
import com.sachindu.anthuriumstore.demo.domain.enums.OrderStatus;
import com.sachindu.anthuriumstore.demo.domain.enums.PaymentStatus;
import com.sachindu.anthuriumstore.demo.domain.model.*;
import com.sachindu.anthuriumstore.demo.repository.*;
import com.sachindu.anthuriumstore.demo.web.dto.OrderRequest;
import com.sachindu.anthuriumstore.demo.web.dto.OrderResponse;
import com.sachindu.anthuriumstore.demo.web.dto.OrderItemResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

        private final OrderRepository orderRepository;
        private final UserRepository userRepository;
        private final PlantRepository plantRepository;
        private final CartRepository cartRepository;

        public OrderService(
                        OrderRepository orderRepository,
                        UserRepository userRepository,
                        PlantRepository plantRepository,
                        CartRepository cartRepository) {
                this.orderRepository = orderRepository;
                this.userRepository = userRepository;
                this.plantRepository = plantRepository;
                this.cartRepository = cartRepository;
        }

        private User currentUser() {
                String email = SecurityContextHolder.getContext().getAuthentication().getName();
                return userRepository.findByEmail(email)
                                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        }

        @Transactional
        public OrderResponse createOrder(OrderRequest req) {
                User user = currentUser();

                Order order = Order.builder()
                                .user(user)
                                .orderStatus(OrderStatus.PAYMENT_PENDING) // Default state
                                .paymentMethod(req.paymentMethod())
                                .paymentStatus(PaymentStatus.PENDING)
                                .fulfillmentMethod(req.fulfillmentMethod())
                                .deliveryAddress(req.deliveryAddress() != null ? req.deliveryAddress().toText() : null)
                                .createdAt(Instant.now())
                                .build();

                int totalCents = 0;

                for (var itemReq : req.items()) {
                        Plant plant = plantRepository.findById(itemReq.plantId())
                                        .orElseThrow(() -> new IllegalArgumentException(
                                                        "Plant not found: " + itemReq.plantId()));

                        if (plant.getStockQty() < itemReq.quantity()) {
                                throw new IllegalArgumentException("Not enough stock for " + plant.getName());
                        }

                        // Deduct stock
                        plant.setStockQty(plant.getStockQty() - itemReq.quantity());
                        plantRepository.save(plant);

                        OrderItem orderItem = OrderItem.builder()
                                        .order(order)
                                        .plant(plant)
                                        .qty(itemReq.quantity())
                                        .priceCents(itemReq.unitPriceCents())
                                        .build();

                        order.getItems().add(orderItem);
                        totalCents += itemReq.quantity() * itemReq.unitPriceCents();
                }

                order.setTotalCents(totalCents);
                Order saved = orderRepository.save(order);

                // Deactivate active cart if exists
                cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE)
                                .ifPresent(cart -> {
                                        cart.setStatus(CartStatus.CHECKED_OUT);
                                        cart.setUpdatedAt(Instant.now());
                                        cartRepository.save(cart);
                                });

                return toResponse(saved);
        }

        @Transactional(readOnly = true)
        public List<OrderResponse> getMyOrders() {
                User user = currentUser();
                return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                                .map(this::toResponse)
                                .collect(Collectors.toList());
        }

        @Transactional(readOnly = true)
        public List<OrderResponse> getAllOrders() {
                return orderRepository.findAll().stream()
                                .map(this::toResponse)
                                .collect(Collectors.toList());
        }

        private OrderResponse toResponse(Order order) {
                List<OrderItemResponse> itemResponses = order.getItems().stream()
                                .map(i -> new OrderItemResponse(
                                                i.getId(),
                                                i.getPlant().getId(),
                                                i.getPlant().getName(),
                                                i.getQty(),
                                                i.getPriceCents(),
                                                i.getQty() * i.getPriceCents()))
                                .collect(Collectors.toList());

                return new OrderResponse(
                                order.getId(),
                                order.getUser().getName(),
                                order.getOrderStatus(),
                                order.getPaymentMethod(),
                                order.getPaymentStatus(),
                                order.getFulfillmentMethod(),
                                order.getDeliveryAddress(),
                                order.getTotalCents(),
                                order.getCreatedAt(),
                                itemResponses);
        }
}
