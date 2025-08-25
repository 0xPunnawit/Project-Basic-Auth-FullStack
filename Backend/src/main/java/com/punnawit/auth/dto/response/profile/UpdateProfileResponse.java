package com.punnawit.auth.dto.response.profile;

import lombok.Data;

@Data
public class UpdateProfileResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String role;

}
