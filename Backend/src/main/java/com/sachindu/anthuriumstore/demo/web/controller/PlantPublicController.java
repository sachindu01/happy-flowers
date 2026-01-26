package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.service.PlantService;
import com.sachindu.anthuriumstore.demo.web.dto.PlantResponse;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plants")
public class PlantPublicController {

    private final PlantService plantService;

    public PlantPublicController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping
    public List<PlantResponse> list() {
        return plantService.listPublicPlants().stream().map(PlantResponse::from).toList();
    }

    @GetMapping("/{id}")
    public PlantResponse get(@PathVariable Long id) {
        return PlantResponse.from(plantService.getPlant(id));
    }
}
