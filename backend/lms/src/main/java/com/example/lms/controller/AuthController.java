package com.example.lms.controller;

import com.example.lms.dto.AuthResponse;
import com.example.lms.dto.LoginRequest;
import com.example.lms.dto.RegisterRequest;
import com.example.lms.entity.User;
import com.example.lms.security.JwtUtil;
import com.example.lms.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
    this.authService = authService;
    this.jwtUtil = jwtUtil;
}

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws Exception {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginAlt(@RequestBody LoginRequest request) throws Exception {
        User user = authService.authenticate(request);

        String token = jwtUtil.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setId(user.getId());
        response.setUsername(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return ResponseEntity.ok(response);
    }
}
