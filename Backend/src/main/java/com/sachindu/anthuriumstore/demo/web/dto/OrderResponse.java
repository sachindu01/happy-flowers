package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.enums.FulfillmentMethod;
import com.sachindu.anthuriumstore.demo.domain.enums.OrderStatus;
import com.sachindu.anthuriumstore.demo.domain.enums.PaymentMethod;
import com.sachindu.anthuriumstore.demo.domain.enums.PaymentStatus;

import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String userName,
        OrderStatus orderStatus,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        FulfillmentMethod fulfillmentMethod,
        String deliveryAddress,
        Integer totalCents,
        Instant createdAt,
        List<OrderItemResponse> items) {
}
