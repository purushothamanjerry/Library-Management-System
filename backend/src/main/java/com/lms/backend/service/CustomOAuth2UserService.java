package com.lms.backend.service;

import com.lms.backend.entity.User;
import com.lms.backend.enums.AccountStatus;
import com.lms.backend.enums.Role;
import com.lms.backend.repository.AuthenticationRepo;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AuthenticationRepo userRepository;

    public CustomOAuth2UserService(AuthenticationRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (email != null) {
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                // Create a new user if one doesn't exist
                User newUser = User.builder()
                        .email(email)
                        .name(name)
                        .role(Role.USER)
                        .status(AccountStatus.APPROVED)
                        .password(null) // No password for OAuth users
                        .build();
                userRepository.save(newUser);
            }
        }

        return oAuth2User;
    }
}
