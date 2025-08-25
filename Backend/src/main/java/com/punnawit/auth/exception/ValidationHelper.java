package com.punnawit.auth.exception;

import com.punnawit.auth.dto.response.error.ErrorMessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public class ValidationHelper {

    // Handle validation errors (e.g. @NotBlank, @Size, @Pattern)
    public static ResponseEntity<ErrorMessageResponse> handleValidationErrors(BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            result.getAllErrors().forEach(error -> {
                errorMessage.append(error.getDefaultMessage()).append(", ");
            });

            ErrorMessageResponse errorMessageResponse = new ErrorMessageResponse();
            errorMessageResponse.setMessage(errorMessage.toString());

            return ResponseEntity.badRequest().body(errorMessageResponse);
        } else {
            return null;
        }
    }
}
