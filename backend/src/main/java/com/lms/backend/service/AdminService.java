package com.lms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lms.backend.entity.User;
import com.lms.backend.enums.AccountStatus;
import com.lms.backend.repository.AuthenticationRepo;

@Service
public class AdminService {
    private final AuthenticationRepo authenticationRepo;

    public AdminService(AuthenticationRepo authenticationRepo) {
        this.authenticationRepo = authenticationRepo;
    }

    public ResponseEntity<List<String>> getNewRequests() {
        List<User> newRequests = authenticationRepo.findByStatus(AccountStatus.PENDING);
        List<String> emails = newRequests.stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
        return ResponseEntity.ok(emails);
    }

    public ResponseEntity<String> approveRequest(String email) {
        java.util.Optional<User> userOptional = authenticationRepo.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getStatus() == AccountStatus.PENDING) {
                user.setStatus(AccountStatus.APPROVED);
                authenticationRepo.save(user);
                return ResponseEntity.ok("Request for " + email + " approved successfully.");
            } else {
                return ResponseEntity.badRequest().body("User request is not in PENDING status.");
            }
        }
        return ResponseEntity.badRequest().body("User not found.");
    }

}