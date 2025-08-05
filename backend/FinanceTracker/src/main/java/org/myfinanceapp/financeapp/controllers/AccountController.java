package org.myfinanceapp.financeapp.controllers;

import org.myfinanceapp.financeapp.models.DTO.AccountDTO;
import org.myfinanceapp.financeapp.services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable Long accountId) {
        AccountDTO account = accountService.getAccountById(accountId);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AccountDTO>> getAllAccountsByUserId(@PathVariable Long userId) {
        List<AccountDTO> accounts = accountService.getAllAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addAccount(@RequestBody AccountDTO accountDTO) {
        accountService.addAccount(accountDTO);
        return ResponseEntity.status(201).body("Account added successfully.");
    }

    @PutMapping("/")
    public ResponseEntity<String> updateAccount(@RequestBody AccountDTO accountDTO) {
        accountService.updateAccount(accountDTO);
        return ResponseEntity.ok("Account updated successfully.");
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok("Account deleted successfully.");
    }
}