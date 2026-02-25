package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.model.Plant;

public record PlantResponse(
        Long id,
        String name,
        String description,
        String category,
        Integer priceCents,
        Integer stockQty,
        Boolean isActive,
        String imageUrl) {
    public static PlantResponse from(Plant p) {
        String mainImage = (p.getImages() != null && !p.getImages().isEmpty())
                ? p.getImages().get(0).getUrl()
                : null;

        return new PlantResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getCategory(),
                p.getPriceCents(),
                p.getStockQty(),
                p.getIsActive(),
                mainImage);
    }
}
