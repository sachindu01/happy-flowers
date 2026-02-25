package com.sachindu.anthuriumstore.demo.repository;

import com.sachindu.anthuriumstore.demo.domain.model.Order;
import com.sachindu.anthuriumstore.demo.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);

    List<Order> findByUserEmailOrderByCreatedAtDesc(String email);
}
