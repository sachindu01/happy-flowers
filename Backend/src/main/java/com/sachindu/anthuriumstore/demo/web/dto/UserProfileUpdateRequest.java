package com.sachindu.anthuriumstore.demo.web.dto;

import jakarta.validation.constraints.NotBlank;

public record UserProfileUpdateRequest(
        @NotBlank String name,
        String phone) {
}
