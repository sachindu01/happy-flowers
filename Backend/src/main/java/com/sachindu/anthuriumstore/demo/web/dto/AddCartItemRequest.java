package com.sachindu.anthuriumstore.demo.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddCartItemRequest(
        @NotNull Long plantId,
        @NotNull @Min(1) Integer qty
) {}
