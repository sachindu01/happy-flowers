package com.sachindu.anthuriumstore.demo.web.dto;

public record OrderItemResponse(
        Long id,
        Long plantId,
        String plantName,
        Integer qty,
        Integer priceCents,
        Integer lineTotalCents) {
}
