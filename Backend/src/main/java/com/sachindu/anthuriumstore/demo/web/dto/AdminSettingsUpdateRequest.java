package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.enums.AllowedFulfillment;
import jakarta.validation.constraints.NotNull;

public record AdminSettingsUpdateRequest(
        @NotNull AllowedFulfillment allowedFulfillmentMethod) {
}
