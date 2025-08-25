package com.punnawit.auth.dto.response.profile;

import lombok.Data;

@Data
public class ProfileResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String role;

}
