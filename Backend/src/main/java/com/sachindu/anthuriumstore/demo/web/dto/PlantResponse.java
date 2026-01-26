package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.model.Plant;

public record PlantResponse(
        Long id,
        String name,
        String description,
        String category,
        Integer priceCents,
        Integer stockQty,
        Boolean isActive
) {
    public static PlantResponse from(Plant p) {
        return new PlantResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getCategory(),
                p.getPriceCents(),
                p.getStockQty(),
                p.getIsActive()
        );
    }
}
