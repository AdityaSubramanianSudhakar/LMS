package com.example.lms.dto;

public class AuthResponse {
    private String token;
    private String username;
    private Long id;
    private String email;
    private String role;

    public AuthResponse(String token, String username, Long id, String email, String role) {
        this.token = token;
        this.username = username;
        this.id=id;
        this.email=email;
        this.role=role;
    }

    public AuthResponse() {
        
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token=token;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username=username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

   

    
}
