package com.punnawit.auth.business;

import com.punnawit.auth.dto.request.auth.LoginRequest;
import com.punnawit.auth.dto.request.auth.RegisterRequest;
import com.punnawit.auth.dto.request.profile.UpdateProfileRequest;
import com.punnawit.auth.dto.response.admin.ProfileUserResponse;
import com.punnawit.auth.dto.response.admin.ProfileUsersResponse;
import com.punnawit.auth.dto.response.auth.RegisterResponse;
import com.punnawit.auth.dto.response.profile.ProfileResponse;
import com.punnawit.auth.dto.response.profile.UpdateProfileResponse;
import com.punnawit.auth.entity.Users;
import com.punnawit.auth.exception.BaseException;
import com.punnawit.auth.exception.UserException;
import com.punnawit.auth.mapper.UserMapper;
import com.punnawit.auth.service.UserService;
import com.punnawit.auth.util.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserBusiness {

    private final UserService userService;
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    public UserBusiness(UserService userService, UserMapper userMapper, JwtUtil jwtUtil) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.jwtUtil = jwtUtil;
    }

    // ============ REGISTER ============
    public RegisterResponse register(RegisterRequest request) throws BaseException {

        Users user = userService.register(request);

        return userMapper.toRegisterResponse(user);
    }

    // ============ LOGIN ============
    public String login(LoginRequest request) throws BaseException {
        Optional<Users> byEmail = userService.findByEmail(request.getEmail());
        if (byEmail.isEmpty()) {
            throw UserException.loginFailEmailNotFound();
        }

        Users users = byEmail.get();
        if (!userService.matchPassword(request.getPassword(), users.getPassword())) {
            throw UserException.loginFailPasswordIncorrect();
        }

        return jwtUtil.tokenize(users);
    }

    // ============ PROFILE ============
    public ProfileResponse profile(Authentication authentication) throws BaseException {

        String userId = authentication.getName();
        if (userId.isEmpty()) {
            throw UserException.notFound();
        }

        Optional<Users> byId = userService.findById(userId);
        if (byId.isEmpty()) {
            throw UserException.notFound();
        }

        return userMapper.toProfileResponse(byId.get());
    }

    public UpdateProfileResponse updateProfile(
            Authentication authentication,
            UpdateProfileRequest request
    ) throws BaseException {

        String userId = authentication.getName();

        Users updateUser = userService.updateProfile(userId, request);

        return userMapper.toUpdateProfileResponse(updateUser);

    }

    // ============ ADMIN ============
    public ProfileUsersResponse getAllUsers() throws BaseException {
        List<Users> users = userService.findAllUsers();
        if (users.isEmpty()) {
            throw UserException.notFound();
        }

        List<ProfileUsersResponse.ProfileUser> profileUsers = userMapper.toProfileUsersResponse(users);
        return new ProfileUsersResponse(profileUsers);
    }

    public ProfileUserResponse getUserById(String userId) throws BaseException {
        Optional<Users> byId = userService.findById(userId);
        if (byId.isEmpty()) {
            throw UserException.notFound();
        }
        return userMapper.toProfileUserResponse(byId.get());
    }

    public void deleteUser(String userId) throws BaseException {

        if (userService.findById(userId).isEmpty()) {
            throw UserException.notFound();
        }
        userService.deleteById(userId);
    }

    public long count() {
        return userService.count();
    }

}
