package com.sachindu.anthuriumstore.demo.web.dto;

public record CartItemResponse(
        Long itemId,
        Long plantId,
        String plantName,
        Integer qty,
        Integer unitPriceCents,
        Integer lineTotalCents
) {}
