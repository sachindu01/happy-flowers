package com.sachindu.anthuriumstore.demo.web.dto;

import java.util.List;

public record CartResponse(
        Long cartId,
        List<CartItemResponse> items,
        Integer totalCents
) {}
