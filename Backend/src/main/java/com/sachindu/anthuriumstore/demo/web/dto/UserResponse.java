package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.enums.Role;
import com.sachindu.anthuriumstore.demo.domain.model.User;
import java.time.Instant;

public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        String phone,
        Instant createdAt) {
    public static UserResponse from(User u) {
        return new UserResponse(
                u.getId(),
                u.getName(),
                u.getEmail(),
                u.getRole(),
                u.getPhone(),
                u.getCreatedAt());
    }
}
