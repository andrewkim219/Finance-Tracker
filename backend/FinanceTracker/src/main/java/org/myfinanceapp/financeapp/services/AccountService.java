package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.DTO.AccountDTO;
import org.myfinanceapp.financeapp.mappers.EntityDtoMapper;
import org.myfinanceapp.financeapp.models.Account;
import org.myfinanceapp.financeapp.models.User;
import org.myfinanceapp.financeapp.repos.AccountRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {
    private final AccountRepo accountRepo;
    private final UserService userService;
    private final EntityDtoMapper mapper;


    public Account getAccountEntityById(Long id) {
        return accountRepo.findAccountById(id)
        .orElseThrow(() -> new IllegalArgumentException("Account with this ID does not exist."));
}

    public AccountService(AccountRepo accountRepo, UserService userService, EntityDtoMapper mapper) {
        this.accountRepo = accountRepo;
        this.userService = userService;
        this.mapper = mapper;
    }

    public void addAccount(AccountDTO accountDTO) {
        Account account = convertToEntity(accountDTO);
        if (accountRepo.findAccountById(account.getId()).isEmpty()) {
            accountRepo.save(account);
        } else {
            throw new IllegalArgumentException("Account with this ID already exists.");
        }
    }

    public AccountDTO getAccountById(Long id) {
        if (accountRepo.findAccountById(id).isPresent()) {
            Account account = accountRepo.findAccountById(id).get();
            return mapper.toAccountDto(account);
        } else {
            throw new IllegalArgumentException("Account with this ID does not exist.");
        }
    }

    public List<AccountDTO> getAllAccountsByUserId(Long userId) {
        List<Account> accounts = accountRepo.findAllByUserId(userId);
        return accounts.stream()
                .map(mapper::toAccountDto)
                .collect(Collectors.toList());
    }

    public void updateAccount(AccountDTO accountDTO) {
        if (accountRepo.findAccountById(accountDTO.getId()).isPresent()) {
            Account account = convertToEntity(accountDTO);
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

    private Account convertToEntity(AccountDTO accountDTO) {
        Account account = new Account();
        account.setId(accountDTO.getId());
        account.setAccountName(accountDTO.getAccountName());
        account.setAccountType(accountDTO.getAccountType());
        account.setBalance(accountDTO.getBalance());

        if (accountDTO.getUserId() != null) {
            User user = userService.getUserEntityById(accountDTO.getUserId());
            account.setUser(user);
        }

        return account;
    }
}