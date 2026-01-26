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
    public List<Plant> listPublicPlants() {
        return plantRepository.findByIsActiveTrueOrderByIdDesc();
    }

    @Transactional(readOnly = true)
    public Plant getPlant(Long id) {
        return plantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Plant not found: " + id));
    }

    @Transactional
    public Plant create(Plant plant) {
        plant.setId(null);
        if (plant.getCreatedAt() == null) plant.setCreatedAt(Instant.now());
        if (plant.getIsActive() == null) plant.setIsActive(true);
        if (plant.getStockQty() == null) plant.setStockQty(0);
        return plantRepository.save(plant);
    }

    @Transactional
    public Plant update(Long id, Plant incoming) {
        Plant existing = getPlant(id);
        existing.setName(incoming.getName());
        existing.setDescription(incoming.getDescription());
        existing.setCategory(incoming.getCategory());
        existing.setPriceCents(incoming.getPriceCents());
        existing.setStockQty(incoming.getStockQty());
        existing.setIsActive(incoming.getIsActive());
        return plantRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        plantRepository.deleteById(id);
    }
}
