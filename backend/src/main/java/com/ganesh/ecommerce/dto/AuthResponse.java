package com.ganesh.ecommerce.dto;

import com.ganesh.ecommerce.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private String token;
    private String message;
}
