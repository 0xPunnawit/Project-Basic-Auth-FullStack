package com.punnawit.auth.controller;

import com.punnawit.auth.business.UserBusiness;
import com.punnawit.auth.dto.request.profile.UpdateProfileRequest;
import com.punnawit.auth.dto.response.error.ErrorMessageResponse;
import com.punnawit.auth.dto.response.profile.ProfileResponse;
import com.punnawit.auth.dto.response.profile.UpdateProfileResponse;
import com.punnawit.auth.exception.BaseException;
import com.punnawit.auth.exception.ValidationHelper;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

    private final UserBusiness userBusiness;

    public UserController(UserBusiness userBusiness) {
        this.userBusiness = userBusiness;
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> profile(Authentication authentication) throws BaseException {
        ProfileResponse profile = userBusiness.profile(authentication);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request,
            BindingResult result) throws BaseException {

        ResponseEntity<ErrorMessageResponse> errorResponse = ValidationHelper.handleValidationErrors(result);
        if (errorResponse != null) {
            return errorResponse;
        }

        UpdateProfileResponse updateProfileResponse = userBusiness.updateProfile(authentication, request);

        return ResponseEntity.ok(updateProfileResponse);
    }


}
