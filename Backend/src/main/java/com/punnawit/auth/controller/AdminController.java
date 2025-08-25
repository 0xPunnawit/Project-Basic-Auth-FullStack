package com.punnawit.auth.controller;

import com.punnawit.auth.business.UserBusiness;
import com.punnawit.auth.dto.response.admin.ProfileUserResponse;
import com.punnawit.auth.dto.response.admin.ProfileUsersResponse;
import com.punnawit.auth.exception.BaseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserBusiness userBusiness;

    public AdminController(UserBusiness userBusiness) {
        this.userBusiness = userBusiness;
    }

    @GetMapping("/users")
    public ResponseEntity<ProfileUsersResponse> getAllUsers() throws BaseException {
        ProfileUsersResponse profileUsers = userBusiness.getAllUsers();
        return ResponseEntity.ok(profileUsers);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ProfileUserResponse> getUserById(@PathVariable String userId) throws BaseException {
        ProfileUserResponse profileUser = userBusiness.getUserById(userId);
        return ResponseEntity.ok(profileUser);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) throws BaseException {
        userBusiness.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }



}