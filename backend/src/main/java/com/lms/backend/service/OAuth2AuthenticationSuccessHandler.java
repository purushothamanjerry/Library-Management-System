package com.lms.backend.service;

import com.lms.backend.entity.User;
import com.lms.backend.repository.AuthenticationRepo;
import com.lms.backend.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final AuthenticationRepo userRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    public OAuth2AuthenticationSuccessHandler(JwtUtil jwtUtil, AuthenticationRepo userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String token = jwtUtil.generateToken(user.getEmail(), "ROLE_" + user.getRole().name());

            // Redirect to frontend with token
            String redirectUrl = frontendUrl + "/oauth2/redirect?token=" + token;
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } else {
            // Should not happen if CustomOAuth2UserService works correctly
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
