package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.domain.model.User;
import com.sachindu.anthuriumstore.demo.repository.UserRepository;
import com.sachindu.anthuriumstore.demo.web.dto.UserProfileUpdateRequest;
import com.sachindu.anthuriumstore.demo.web.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public UserResponse getProfile(Principal principal) {
        User u = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return UserResponse.from(u);
    }

    @PutMapping("/profile")
    public UserResponse updateProfile(@Valid @RequestBody UserProfileUpdateRequest req, Principal principal) {
        User u = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        u.setName(req.name());
        u.setPhone(req.phone());

        return UserResponse.from(userRepository.save(u));
    }
}
