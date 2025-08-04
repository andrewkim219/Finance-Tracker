package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.Account;
import org.myfinanceapp.financeapp.repos.AccountRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    AccountRepo accountRepo;

    public AccountService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    public void addAccount(Account account) {
        if (accountRepo.findAccountById(account.getId()).isEmpty()) {
            accountRepo.save(account);
        } else {
            throw new IllegalArgumentException("Account with this ID already exists.");
        }
    }

    public Account getAccountById(Long id) {
        if (accountRepo.findAccountById(id).isPresent()) {
            return accountRepo.findAccountById(id).get();
        } else {
            throw new IllegalArgumentException("Account with this ID does not exist.");
        }
    }

    public List<Account> getAllAccountsByUserId(Long userId) {
        return accountRepo.findAllByUserId(userId);
    }

    public void updateAccount(Account account) {
        if (accountRepo.findAccountById(account.getId()).isPresent()) {
            accountRepo.save(account);
        } else {
            throw new IllegalArgumentException("Account with this ID does not exist.");
        }
    }

    public void deleteAccount(Long id) {
        if (accountRepo.findAccountById(id).isPresent()) {
            accountRepo.deleteById(id);
        } else {
            throw new IllegalArgumentException("Account with this ID does not exist.");
        }
    }
}
