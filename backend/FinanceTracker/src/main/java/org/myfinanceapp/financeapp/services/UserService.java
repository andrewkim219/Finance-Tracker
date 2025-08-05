package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.DTO.UserDTO;
import org.myfinanceapp.financeapp.handlers.ResourceNotFoundException;
import org.myfinanceapp.financeapp.mappers.EntityDtoMapper;
import org.myfinanceapp.financeapp.models.User;
import org.myfinanceapp.financeapp.repos.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final EntityDtoMapper mapper;

    public UserService(UserRepo userRepo, EntityDtoMapper mapper) {
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    public UserDTO getUserById(Long userId) {
        User user = getUserEntityById(userId);
        return mapper.toUserDto(user);
    }

    // Internal method for other services to use
    public User getUserEntityById(Long userId) {
        return userRepo.findUserById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    public void addUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        if (userRepo.findUserByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Email taken. Use a different email.");
        }

        userRepo.save(user);
    }

    public void deleteUser(Long userId) {
        if (userRepo.findUserById(userId).isEmpty()) {
            throw new ResourceNotFoundException("User with id " + userId + " does not exist.");
        }
        userRepo.deleteById(userId);
    }

    public void updateUser(UserDTO userDTO) {
        User existingUser = getUserEntityById(userDTO.getId());
        existingUser.setUsername(userDTO.getUsername());
        existingUser.setEmail(userDTO.getEmail());
        userRepo.save(existingUser);
    }

    public UserDTO loginUser(String username, String password) {
        User user = userRepo.findUserByUsernameAndPassword(username, password)
            .orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        return mapper.toUserDto(user);
    }
}