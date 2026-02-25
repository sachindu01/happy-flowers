package com.sachindu.anthuriumstore.demo.domain.model;

import com.sachindu.anthuriumstore.demo.domain.enums.FulfillmentMethod;
import com.sachindu.anthuriumstore.demo.domain.enums.OrderStatus;
import com.sachindu.anthuriumstore.demo.domain.enums.PaymentMethod;
import com.sachindu.anthuriumstore.demo.domain.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false, length = 30)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false, length = 20)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 20)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "fulfillment_method", nullable = false, length = 20)
    private FulfillmentMethod fulfillmentMethod;

    @Column(name = "delivery_address", columnDefinition = "text")
    private String deliveryAddress;

    @Column(name = "total_cents", nullable = false)
    private Integer totalCents;

    @Builder.Default
    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    @Builder.Default
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
}
