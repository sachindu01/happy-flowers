package com.sachindu.anthuriumstore.demo.service;

import com.sachindu.anthuriumstore.demo.domain.model.Plant;
import com.sachindu.anthuriumstore.demo.repository.PlantRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlantService {

    private final PlantRepository plantRepository;

    public PlantService(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Transactional(readOnly = true)
    public List<Plant> listPublicPlants(String search, String category, String sortBy) {
        org.springframework.data.domain.Sort sort = org.springframework.data.domain.Sort
                .by(org.springframework.data.domain.Sort.Direction.ASC, "name");

        if ("price".equalsIgnoreCase(sortBy)) {
            sort = org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.ASC,
                    "priceCents");
        } else if ("category".equalsIgnoreCase(sortBy)) {
            sort = org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.ASC,
                    "category");
        }

        return plantRepository.searchPublicPlants(search, category, sort);
    }

    @Transactional(readOnly = true)
    public List<Plant> listAllPlants() {
        return plantRepository.findAllWithImages();
    }

    @Transactional(readOnly = true)
    public List<String> listCategories() {
        return plantRepository.findDistinctCategories();
    }

    @Transactional(readOnly = true)
    public Plant getPlant(Long id) {
        return plantRepository.findByIdWithImages(id)
                .orElseThrow(() -> new IllegalArgumentException("Plant not found: " + id));
    }

    @Transactional
    public Plant create(Plant plant, String imageUrl) {
        plant.setId(null);
        if (plant.getCreatedAt() == null)
            plant.setCreatedAt(Instant.now());
        if (plant.getIsActive() == null)
            plant.setIsActive(true);
        if (plant.getStockQty() == null)
            plant.setStockQty(0);

        Plant saved = plantRepository.save(plant);
        if (imageUrl != null && !imageUrl.isBlank()) {
            saved.getImages().add(com.sachindu.anthuriumstore.demo.domain.model.PlantImage.builder()
                    .plant(saved)
                    .url(imageUrl)
                    .build());
            return plantRepository.save(saved);
        }
        return saved;
    }

    @Transactional
    public Plant update(Long id, Plant incoming, String imageUrl) {
        Plant existing = getPlant(id);
        existing.setName(incoming.getName());
        existing.setDescription(incoming.getDescription());
        existing.setCategory(incoming.getCategory());
        existing.setPriceCents(incoming.getPriceCents());
        existing.setStockQty(incoming.getStockQty());
        existing.setIsActive(incoming.getIsActive());

        if (imageUrl != null && !imageUrl.isBlank()) {
            boolean alreadyHas = existing.getImages().stream()
                    .anyMatch(img -> img.getUrl().equals(imageUrl));
            if (!alreadyHas) {
                existing.getImages().clear();
                existing.getImages().add(com.sachindu.anthuriumstore.demo.domain.model.PlantImage.builder()
                        .plant(existing)
                        .url(imageUrl)
                        .build());
            }
        } else if (imageUrl != null && imageUrl.isBlank()) {
            existing.getImages().clear();
        }

        return plantRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        plantRepository.deleteById(id);
    }
}
