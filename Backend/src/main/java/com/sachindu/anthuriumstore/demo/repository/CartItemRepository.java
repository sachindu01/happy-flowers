package com.sachindu.anthuriumstore.demo.repository;

import com.sachindu.anthuriumstore.demo.domain.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndPlantId(Long cartId, Long plantId);
}
