package org.myfinanceapp.financeapp.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.myfinanceapp.financeapp.models.Transaction.TransactionType;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private Long id;
    private String description;
    private Double amount;
    private LocalDate date;
    private TransactionType type;
    private Long accountId;
    private Long categoryId;
}