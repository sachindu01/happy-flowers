package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.service.CartService;
import com.sachindu.anthuriumstore.demo.web.dto.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public CartResponse getMyCart() {
        return cartService.getMyCart();
    }

    @PostMapping("/items")
    public CartResponse addItem(@Valid @RequestBody AddCartItemRequest req) {
        return cartService.addItem(req);
    }

    @PutMapping("/items/{itemId}")
    public CartResponse updateQty(@PathVariable Long itemId, @Valid @RequestBody UpdateCartItemQtyRequest req) {
        return cartService.updateItemQty(itemId, req);
    }

    @DeleteMapping("/items/{itemId}")
    public CartResponse remove(@PathVariable Long itemId) {
        return cartService.removeItem(itemId);
    }
}
