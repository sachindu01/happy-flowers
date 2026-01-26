package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.domain.model.Plant;
import com.sachindu.anthuriumstore.demo.service.PlantService;
import com.sachindu.anthuriumstore.demo.web.dto.PlantResponse;
import com.sachindu.anthuriumstore.demo.web.dto.PlantUpsertRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/plants")
public class PlantAdminController {

    private final PlantService plantService;

    public PlantAdminController(PlantService plantService) {
        this.plantService = plantService;
    }

    @PostMapping
    public PlantResponse create(@Valid @RequestBody PlantUpsertRequest req) {
        Plant p = Plant.builder()
                .name(req.name())
                .description(req.description())
                .category(req.category())
                .priceCents(req.priceCents())
                .stockQty(req.stockQty())
                .isActive(req.isActive())
                .build();
        return PlantResponse.from(plantService.create(p));
    }

    @PutMapping("/{id}")
    public PlantResponse update(@PathVariable Long id, @Valid @RequestBody PlantUpsertRequest req) {
        Plant incoming = Plant.builder()
                .name(req.name())
                .description(req.description())
                .category(req.category())
                .priceCents(req.priceCents())
                .stockQty(req.stockQty())
                .isActive(req.isActive())
                .build();
        return PlantResponse.from(plantService.update(id, incoming));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        plantService.delete(id);
    }
}
