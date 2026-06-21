package com.lms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.lms.backend.entity.User;

@Repository
public interface AuthenticationRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    java.util.List<User> findByStatus(com.lms.backend.enums.AccountStatus status);
}
