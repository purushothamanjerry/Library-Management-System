package com.lms.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.dto.AuthenticationDto;
import com.lms.backend.dto.ResponseDto;
import com.lms.backend.entity.User;
import com.lms.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/check")
    public String healthCheck() {
        return "Health check passed";
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestBody AuthenticationDto loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@RequestBody User user) {
        return authService.register(user);
    }
}
