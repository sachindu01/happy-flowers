package com.sachindu.anthuriumstore.demo.web.controller;

import com.sachindu.anthuriumstore.demo.domain.enums.AllowedFulfillment;
import com.sachindu.anthuriumstore.demo.domain.model.SiteSettings;
import com.sachindu.anthuriumstore.demo.repository.SiteSettingsRepository;
import com.sachindu.anthuriumstore.demo.web.dto.AdminSettingsUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SettingsController {

    private final SiteSettingsRepository siteSettingsRepository;

    public SettingsController(SiteSettingsRepository siteSettingsRepository) {
        this.siteSettingsRepository = siteSettingsRepository;
    }

    @GetMapping("/public/settings")
    public SiteSettings getSettings() {
        return siteSettingsRepository.findById(1L).orElseGet(() -> {
            SiteSettings defaultSettings = new SiteSettings(1L, AllowedFulfillment.BOTH);
            return siteSettingsRepository.save(defaultSettings);
        });
    }

    @PutMapping("/admin/settings")
    @PreAuthorize("hasRole('ADMIN')")
    public SiteSettings updateSettings(@Valid @RequestBody AdminSettingsUpdateRequest req) {
        SiteSettings settings = siteSettingsRepository.findById(1L)
                .orElse(new SiteSettings(1L, AllowedFulfillment.BOTH));
        settings.setAllowedFulfillmentMethod(req.allowedFulfillmentMethod());
        return siteSettingsRepository.save(settings);
    }
}
