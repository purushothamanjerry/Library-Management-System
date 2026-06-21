package com.lms.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import com.lms.backend.service.AdminService;
import java.util.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/newRequest")
    public ResponseEntity<List<String>> getNewRequests() {
        return adminService.getNewRequests();
    }

    @org.springframework.web.bind.annotation.PostMapping("/approveRequest")
    public ResponseEntity<String> approveRequest(@org.springframework.web.bind.annotation.RequestParam String email) {
        return adminService.approveRequest(email);
    }
}
