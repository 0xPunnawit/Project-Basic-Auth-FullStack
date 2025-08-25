package com.punnawit.auth.dto.request.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @NotBlank(message = "Name cannot be null")
    @Size(min = 3, max = 100, message = "Name must be at least 3 characters long")
    private String name;

    @NotBlank(message = "Phone cannot be null")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be a valid 10 digit number")
    @Size(min = 10, max = 10, message = "Phone must be a valid 10 digit number")
    private String phone;

    @NotBlank(message = "Address cannot be null")
    @Size(min = 5, max = 100, message = "Address must be at least 5 characters long")
    private String address;
}
