package com.example.lms.service;

import com.example.lms.dto.AuthResponse;
import com.example.lms.dto.LoginRequest;
import com.example.lms.dto.RegisterRequest;
import com.example.lms.entity.User;
import com.example.lms.repository.UserRepository;
import com.example.lms.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository employeeRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
    public User authenticate(LoginRequest request) throws Exception {
    User employee = employeeRepository.findByEmail(request.getemail())
            .orElseThrow(() -> new Exception("Invalid email or password"));

    if (!passwordEncoder.matches(request.getPassword(), employee.getPasswordHash())) {
        throw new Exception("Invalid email or password");
    }

    return employee;
}


    // REGISTER
    public AuthResponse register(RegisterRequest request) throws Exception {
        if (employeeRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("User already exists with email: " + request.getEmail());
        }

        User employee = new User();
        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        // 👇 Default role to EMPLOYEE if not provided
        employee.setRole(request.getRole() != null ? request.getRole() : "EMPLOYEE");

        employeeRepository.save(employee);

        // ✅ Generate JWT after registration
        String token = jwtUtil.generateToken(employee.getEmail());

        return new AuthResponse(
                token,
                employee.getName(),
                employee.getId(),
                employee.getEmail(),
                employee.getRole()
        );
    }

    // LOGIN
    public AuthResponse login(LoginRequest request) throws Exception {
        User employee = employeeRepository.findByEmail(request.getemail()) // fixed getEmail()
                .orElseThrow(() -> new Exception("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), employee.getPasswordHash())) {
            throw new Exception("Invalid email or password");
        }

        // ✅ Generate JWT after login
        String token = jwtUtil.generateToken(employee.getEmail());

        return new AuthResponse(
                token,
                employee.getName(),
                employee.getId(),
                employee.getEmail(),
                employee.getRole()
        );
    }
}
