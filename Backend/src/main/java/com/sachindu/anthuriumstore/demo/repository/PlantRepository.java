package com.sachindu.anthuriumstore.demo.repository;

import com.sachindu.anthuriumstore.demo.domain.model.Plant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByIsActiveTrueOrderByIdDesc();
}
