package com.sachindu.anthuriumstore.demo.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PlantUpsertRequest(
                @NotBlank String name,
                String description,
                String category,
                @NotNull @Min(0) Integer priceCents,
                @NotNull @Min(0) Integer stockQty,
                @NotNull Boolean isActive,
                String imageUrl) {
}
