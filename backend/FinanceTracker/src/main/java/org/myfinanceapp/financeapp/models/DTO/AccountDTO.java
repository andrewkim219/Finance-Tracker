package org.myfinanceapp.financeapp.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long id;
    private String accountName;
    private String accountType;
    private Double balance;
    private Long userId; // Only store the ID, not the entire User object
}

