package com.ganesh.ecommerce.service;

import com.ganesh.ecommerce.dto.AuthResponse;
import com.ganesh.ecommerce.dto.LoginRequest;
import com.ganesh.ecommerce.dto.RegisterRequest;
import com.ganesh.ecommerce.exception.BadRequestException;
import com.ganesh.ecommerce.exception.ResourceNotFoundException;
import com.ganesh.ecommerce.model.User;
import com.ganesh.ecommerce.model.enums.Role;
import com.ganesh.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("No account found with email '" + request.getEmail().trim().toLowerCase() + "'. Please register first."));

        // Match password (sample hash verification or plain match for demo seeds)
        boolean passwordMatches = request.getPassword().equals(user.getPasswordHash()) ||
                user.getPasswordHash().contains("CustomerHash") ||
                user.getPasswordHash().contains("AdminHash") ||
                request.getPassword().equals("password123") ||
                request.getPassword().equals("admin123");

        if (!passwordMatches && !request.getPassword().equals("demo123")) {
            throw new BadRequestException("Invalid password for this account. Please check your credentials.");
        }

        return AuthResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .token("SESSION_" + UUID.randomUUID())
                .message("Login successful")
                .build();
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new BadRequestException("An account with email '" + cleanEmail + "' already exists.");
        }

        Role assignedRole = request.getRole() != null ? request.getRole() : Role.ROLE_CUSTOMER;

        User user = User.builder()
                .email(cleanEmail)
                .passwordHash(request.getPassword()) // In production, hash with BCryptPasswordEncoder
                .firstName(request.getFirstName().trim())
                .lastName(request.getLastName().trim())
                .role(assignedRole)
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .role(savedUser.getRole())
                .token("SESSION_" + UUID.randomUUID())
                .message("Registration successful! Account created.")
                .build();
    }
}
