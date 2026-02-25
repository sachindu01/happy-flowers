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

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AdminSeeder.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@happyflowers.local").toLowerCase();
        String adminPass = System.getenv().getOrDefault("ADMIN_PASSWORD", "admin123");

        userRepository.findByEmail(adminEmail).ifPresentOrElse(
                user -> {
                    boolean changed = false;
                    if (!passwordEncoder.matches(adminPass, user.getPasswordHash())) {
                        user.setPasswordHash(passwordEncoder.encode(adminPass));
                        changed = true;
                        log.info("Admin password updated.");
                    }
                    if (user.getRole() != Role.ADMIN) {
                        user.setRole(Role.ADMIN);
                        changed = true;
                        log.info("Admin role updated to ADMIN.");
                    }
                    if (changed) {
                        userRepository.save(user);
                    } else {
                        log.info("Admin user already up to date.");
                    }
                },
                () -> {
                    userRepository.save(User.builder()
                            .name("Admin")
                            .email(adminEmail)
                            .passwordHash(passwordEncoder.encode(adminPass))
                            .role(Role.ADMIN)
                            .createdAt(Instant.now())
                            .build());
                    log.info("Admin user created.");
                });
    }
}
