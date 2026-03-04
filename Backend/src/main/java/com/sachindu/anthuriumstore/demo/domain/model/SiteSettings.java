package com.sachindu.anthuriumstore.demo.domain.model;

import com.sachindu.anthuriumstore.demo.domain.enums.AllowedFulfillment;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "site_settings")
public class SiteSettings {
    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "allowed_fulfillment_method", nullable = false, length = 50)
    private AllowedFulfillment allowedFulfillmentMethod;
}
