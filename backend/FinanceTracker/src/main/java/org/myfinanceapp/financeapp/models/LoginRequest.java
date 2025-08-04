package org.myfinanceapp.financeapp.models;

import lombok.Data;

@Data
public class LoginRequest {

    private String username;
    private String password;
}
