package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminUserUpdateRequest(
        @NotBlank String name,
        String phone,
        @NotNull Role role) {
}
