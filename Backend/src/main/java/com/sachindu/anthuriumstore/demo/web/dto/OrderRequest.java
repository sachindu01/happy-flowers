package com.sachindu.anthuriumstore.demo.web.dto;

import com.sachindu.anthuriumstore.demo.domain.enums.FulfillmentMethod;
import com.sachindu.anthuriumstore.demo.domain.enums.PaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequest(
        @NotEmpty List<OrderItemRequest> items,
        @NotNull FulfillmentMethod fulfillmentMethod,
        @NotNull PaymentMethod paymentMethod,
        AddressRequest deliveryAddress) {
    public record OrderItemRequest(
            @NotNull Long plantId,
            @NotNull Integer quantity,
            @NotNull Integer unitPriceCents) {
    }

    public record AddressRequest(
            String street,
            String city,
            String state,
            String zip) {
        public String toText() {
            return String.format("%s, %s, %s, %s", street, city, state, zip);
        }
    }
}
