package com.sachindu.anthuriumstore.demo.repository;

import com.sachindu.anthuriumstore.demo.domain.enums.CartStatus;
import com.sachindu.anthuriumstore.demo.domain.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserIdAndStatus(Long userId, CartStatus status);
}
