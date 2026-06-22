package com.lms.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.lms.backend.entity.User;
import com.lms.backend.service.AdminService;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/newRequest")
    public ResponseEntity<List<String>> getNewRequests() {
        return adminService.getNewRequests();
    }

    @PostMapping("/approveRequest")
    public ResponseEntity<String> approveRequest(@RequestParam String email) {
        return adminService.approveRequest(email);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return adminService.deleteUser(id);
    }
}
