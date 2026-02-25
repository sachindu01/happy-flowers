package com.sachindu.anthuriumstore.demo.repository;

import com.sachindu.anthuriumstore.demo.domain.model.Plant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {

    @Query("SELECT DISTINCT p FROM Plant p LEFT JOIN FETCH p.images")
    List<Plant> findAllWithImages();

    @Query("SELECT DISTINCT p FROM Plant p LEFT JOIN FETCH p.images WHERE p.isActive = true ORDER BY p.id DESC")
    List<Plant> findByIsActiveTrueWithImages();

    @Query("SELECT DISTINCT p.category FROM Plant p WHERE p.isActive = true AND p.category IS NOT NULL AND p.category <> ''")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT p FROM Plant p LEFT JOIN FETCH p.images WHERE p.id = :id")
    Optional<Plant> findByIdWithImages(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Plant p LEFT JOIN FETCH p.images " +
            "WHERE p.isActive = true " +
            "AND (:category IS NULL OR :category = '' OR LOWER(p.category) = LOWER(:category)) " +
            "AND (:search IS NULL OR :search = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Plant> searchPublicPlants(@Param("search") String search, @Param("category") String category,
            org.springframework.data.domain.Sort sort);

    List<Plant> findByIsActiveTrueOrderByIdDesc();
}
