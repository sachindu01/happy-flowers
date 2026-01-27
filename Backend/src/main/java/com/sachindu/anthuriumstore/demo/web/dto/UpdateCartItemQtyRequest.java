package com.sachindu.anthuriumstore.demo.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateCartItemQtyRequest(
        @NotNull @Min(0) Integer qty
) {}
