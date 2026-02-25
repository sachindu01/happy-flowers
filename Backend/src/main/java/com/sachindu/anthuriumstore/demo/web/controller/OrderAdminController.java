package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.service.OrderService;
import com.sachindu.anthuriumstore.demo.web.dto.OrderResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class OrderAdminController {

    private final OrderService orderService;

    public OrderAdminController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }
}
