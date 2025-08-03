package org.myfinanceapp.financeapp.controllers;

import org.myfinanceapp.financeapp.models.Account;
import org.myfinanceapp.financeapp.services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long accountId) {
        Account account = accountService.getAccountById(accountId);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Account>> getAllAccountsByUserId(@PathVariable Long userId) {
        List<Account> accounts = accountService.getAllAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }

    @PostMapping("/")
    public ResponseEntity<String> addAccount(@RequestBody Account account) {
        accountService.addAccount(account);
        return ResponseEntity.status(201).body("Account added successfully.");
    }

    @PutMapping("/")
    public ResponseEntity<String> updateAccount(@RequestBody Account account) {
        accountService.updateAccount(account);
        return ResponseEntity.ok("Account updated successfully.");
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok("Account deleted successfully.");
    }
}
