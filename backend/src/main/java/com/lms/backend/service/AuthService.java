package com.lms.backend.service;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.backend.dto.AuthenticationDto;
import com.lms.backend.dto.ResponseDto;
import com.lms.backend.enums.AccountStatus;
import com.lms.backend.enums.Role;
import com.lms.backend.entity.User;
import com.lms.backend.repository.AuthenticationRepo;
import com.lms.backend.util.JwtUtil;

@Service
public class AuthService {

    private final AuthenticationRepo authenticationRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(AuthenticationRepo authenticationRepo, JwtUtil jwtUtil) {
        this.authenticationRepo = authenticationRepo;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<ResponseDto> login(AuthenticationDto loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return badRequest("Email and password are required");
        }

        Optional<User> userOpt = authenticationRepo.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                if (user.getStatus() != AccountStatus.APPROVED) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new ResponseDto("Account pending admin approval", false));
                }
                
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
                return ResponseEntity.ok(new ResponseDto("Login successful", true, token));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseDto("Invalid email or password", false));
    }

    public ResponseEntity<ResponseDto> register(User user) {
        if (alreadyExists(user.getEmail())) {
            return badRequest("User with this email already exists");
        }

        if (!checkEmailFormat(user.getEmail())) {
            return badRequest("Invalid email format");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        user.setStatus(AccountStatus.PENDING);

        authenticationRepo.save(user);
        return okResponse("User registered successfully");
    }

    public boolean alreadyExists(String email) {
        if (email == null)
            return false;
        return authenticationRepo.findByEmail(email).isPresent();
    }

    public boolean checkEmailFormat(String email) {
        if (email == null || email.length() < 3)
            return false;
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return Pattern.compile(emailRegex).matcher(email).matches();
    }

    public ResponseEntity<ResponseDto> badRequest(String message) {
        return ResponseEntity.badRequest().body(new ResponseDto(message, false));
    }

    public ResponseEntity<ResponseDto> okResponse(String message) {
        return ResponseEntity.ok(new ResponseDto(message, true));
    }
}
