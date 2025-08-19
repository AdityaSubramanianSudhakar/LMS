package com.example.lms.service;

import com.example.lms.entity.User;
import com.example.lms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    // UserService.java
    public User updateUser(Long id, User userUpdates) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Only update allowed fields
        if (userUpdates.getName() != null && !userUpdates.getName().isBlank()) {
            existingUser.setName(userUpdates.getName());
        }

        // keep email, role, passwordHash safe
        return userRepository.save(existingUser);
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
