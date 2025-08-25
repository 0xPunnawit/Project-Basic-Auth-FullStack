package com.punnawit.auth.dto.response.admin;

import lombok.Data;

@Data
public class ProfileUserResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String role;
}
