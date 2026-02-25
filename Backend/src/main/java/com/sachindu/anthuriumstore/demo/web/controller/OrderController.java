package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.service.OrderService;
import com.sachindu.anthuriumstore.demo.web.dto.OrderRequest;
import com.sachindu.anthuriumstore.demo.web.dto.OrderResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponse create(@Valid @RequestBody OrderRequest req) {
        return orderService.createOrder(req);
    }

    @GetMapping
    public List<OrderResponse> getMyOrders() {
        return orderService.getMyOrders();
    }
}
