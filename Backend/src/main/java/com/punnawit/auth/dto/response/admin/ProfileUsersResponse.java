package com.punnawit.auth.dto.response.admin;

import lombok.Data;

import java.util.List;

@Data
public class ProfileUsersResponse {
    private List<ProfileUser> users;

    public ProfileUsersResponse(List<ProfileUser> users) {
        this.users = users;
    }

    @Data
    public static class ProfileUser {
        private String id;
        private String name;
        private String email;
        private String phone;
        private String address;
        private String role;
    }
}
