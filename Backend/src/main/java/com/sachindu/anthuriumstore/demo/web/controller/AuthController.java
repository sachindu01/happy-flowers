package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.domain.enums.Role;
import com.sachindu.anthuriumstore.demo.domain.model.User;
import com.sachindu.anthuriumstore.demo.repository.UserRepository;
import com.sachindu.anthuriumstore.demo.security.JwtService;
import com.sachindu.anthuriumstore.demo.web.dto.*;
import jakarta.validation.Valid;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        String email = req.email().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        User u = User.builder()
                .name(req.name())
                .email(email)
                .passwordHash(passwordEncoder.encode(req.password()))
                .role(Role.USER)
                .phone(req.phone())
                .createdAt(Instant.now())
                .build();

        userRepository.save(u);

        return new AuthResponse(jwtService.generateToken(u.getEmail(), u.getName(), u.getRole()));
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        String email = req.email().toLowerCase();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, req.password()));

        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new AuthResponse(jwtService.generateToken(u.getEmail(), u.getName(), u.getRole()));
    }

    @PostMapping("/forgot-password")
    public java.util.Map<String, String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        String email = req.email().toLowerCase();
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String token = java.util.UUID.randomUUID().toString();
        u.setResetToken(token);
        u.setResetTokenExpiry(Instant.now().plusSeconds(3600)); // 1 hour expiry
        userRepository.save(u);

        // Simulated email payload returned conceptually for frontend development
        // parsing
        return java.util.Map.of("message", "Password reset requested. Check your email.", "mockToken", token);
    }

    @PostMapping("/reset-password")
    public java.util.Map<String, String> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        User u = userRepository.findAll().stream()
                .filter(user -> req.token().equals(user.getResetToken()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token"));

        if (u.getResetTokenExpiry().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Reset token has expired");
        }

        u.setPasswordHash(passwordEncoder.encode(req.newPassword()));
        u.setResetToken(null);
        u.setResetTokenExpiry(null);
        userRepository.save(u);

        return java.util.Map.of("message", "Password has been successfully updated.");
    }
}
