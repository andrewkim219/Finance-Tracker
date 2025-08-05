package org.myfinanceapp.financeapp.mappers;

import org.myfinanceapp.financeapp.models.DTO.AccountDTO;
import org.myfinanceapp.financeapp.models.DTO.UserDTO;
import org.myfinanceapp.financeapp.models.Account;
import org.myfinanceapp.financeapp.models.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EntityDtoMapper {

    public AccountDTO toAccountDto(Account account) {
        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setAccountName(account.getAccountName());
        dto.setAccountType(account.getAccountType());
        dto.setBalance(account.getBalance());
        dto.setUserId(account.getUser() != null ? account.getUser().getId() : null);
        return dto;
    }

    public UserDTO toUserDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());

        if (user.getAccounts() != null) {
            List<AccountDTO> accountDTOs = user.getAccounts().stream()
                .map(this::toAccountDto)
                .collect(Collectors.toList());
            dto.setAccounts(accountDTOs);
        }

        return dto;
    }
}