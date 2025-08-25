package com.punnawit.auth.controller;

import com.punnawit.auth.business.UserBusiness;
import com.punnawit.auth.dto.request.auth.LoginRequest;
import com.punnawit.auth.dto.request.auth.RegisterRequest;
import com.punnawit.auth.dto.response.auth.RegisterResponse;
import com.punnawit.auth.dto.response.error.ErrorMessageResponse;
import com.punnawit.auth.exception.BaseException;
import com.punnawit.auth.exception.ValidationHelper;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserBusiness userBusiness;

    public AuthController(UserBusiness userBusiness) {
        this.userBusiness = userBusiness;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request, BindingResult result
    ) throws BaseException {

        ResponseEntity<ErrorMessageResponse> errorResponse = ValidationHelper.handleValidationErrors(result);
        if (errorResponse != null) {
            return errorResponse;
        }

        RegisterResponse register = userBusiness.register(request);

        return ResponseEntity.status(201).body(register);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid@RequestBody LoginRequest request, BindingResult result
    ) throws BaseException {

        ResponseEntity<ErrorMessageResponse> errorResponse = ValidationHelper.handleValidationErrors(result);
        if (errorResponse != null) {
            return errorResponse;
        }

        String token = userBusiness.login(request);
        return ResponseEntity.ok(token);
    }

    // get count user
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(userBusiness.count());
    }

}
