package com.sachindu.anthuriumstore.demo.config;

import com.sachindu.anthuriumstore.demo.domain.enums.Role;
import com.sachindu.anthuriumstore.demo.domain.model.User;
import com.sachindu.anthuriumstore.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@happyflowers.local").toLowerCase();
        String adminPass  = System.getenv().getOrDefault("ADMIN_PASSWORD", "admin123");

        if (!userRepository.existsByEmail(adminEmail)) {
            userRepository.save(User.builder()
                    .name("Admin")
                    .email(adminEmail)
                    .passwordHash(passwordEncoder.encode(adminPass))
                    .role(Role.ADMIN)
                    .createdAt(Instant.now())
                    .build());
        }
    }
}
