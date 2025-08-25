package com.punnawit.auth.dto.request.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email cannot be null")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be null")
    @Size(min = 8, max = 100, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Name cannot be null")
    @Size(min = 3, max = 100, message = "Name must be at least 3 characters long")
    private String name;

    @NotNull(message = "Phone cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be a valid 10 digit number")
    private String phone;

    @NotBlank(message = "Address cannot be null")
    @Size(min = 5, max = 100, message = "Address must be at least 5 characters long")
    private String address;
}
