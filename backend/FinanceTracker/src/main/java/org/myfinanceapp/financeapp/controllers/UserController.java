package org.myfinanceapp.financeapp.controllers;

import org.myfinanceapp.financeapp.models.LoginRequest;
import org.myfinanceapp.financeapp.models.User;
import org.myfinanceapp.financeapp.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.status(201).body("User registered successfully.");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok("User updated successfully.");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        // This is a placeholder for login logic. In a real application, you would validate the credentials.
        // For now, we will just return a success message.
        User user = userService.loginUser(username, password); // Example to ensure user exists, replace with actual logic.
        return ResponseEntity.ok(user);
    }
}
