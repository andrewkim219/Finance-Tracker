package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.DTO.TransactionDTO;
import org.myfinanceapp.financeapp.mappers.EntityDtoMapper;
import org.myfinanceapp.financeapp.models.Account;
import org.myfinanceapp.financeapp.models.Category;
import org.myfinanceapp.financeapp.models.Transaction;
import org.myfinanceapp.financeapp.repos.TransactionRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final AccountService accountService;
    private final CategoryService categoryService;
    private final EntityDtoMapper mapper;

    public TransactionService(TransactionRepo transactionRepo,
                             AccountService accountService,
                             CategoryService categoryService,
                             EntityDtoMapper mapper) {
        this.transactionRepo = transactionRepo;
        this.accountService = accountService;
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    public TransactionDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepo.findTransactionById(id)
            .orElseThrow(() -> new IllegalArgumentException("Transaction with this ID does not exist."));
        return mapper.toTransactionDto(transaction);
    }

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepo.findAll().stream()
            .map(mapper::toTransactionDto)
            .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByAccountId(Long accountId) {
        return transactionRepo.findAllByAccountId(accountId).stream()
            .map(mapper::toTransactionDto)
            .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByCategoryId(Long categoryId) {
        return transactionRepo.findAllByCategoryId(categoryId).stream()
            .map(mapper::toTransactionDto)
            .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByUserId(Long userId) {
        return transactionRepo.findAllByAccount_User_Id(userId).stream()
            .map(mapper::toTransactionDto)
            .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByAmount(Double amount) {
        return transactionRepo.findAllByAmount(amount).stream()
            .map(mapper::toTransactionDto)
            .collect(Collectors.toList());
    }

    public List<TransactionDTO> getTransactionsByDateRange(LocalDate startDate, LocalDate endDate) {
        return transactionRepo.findAllByDateBetween(startDate, endDate).stream()
            .map(mapper::toTransactionDto)
            .collect(Collectors.toList());
    }

    public void addTransaction(TransactionDTO transactionDTO) {
        Transaction transaction = convertToEntity(transactionDTO);
        transactionRepo.save(transaction);
    }

    public void updateTransaction(TransactionDTO transactionDTO) {
        if (transactionRepo.findTransactionById(transactionDTO.getId()).isEmpty()) {
            throw new IllegalArgumentException("Transaction with this ID does not exist.");
        }
        Transaction transaction = convertToEntity(transactionDTO);
        transactionRepo.save(transaction);
    }

    public void deleteTransaction(Long id) {
        if (transactionRepo.findTransactionById(id).isEmpty()) {
            throw new IllegalArgumentException("Transaction with this ID does not exist.");
        }
        transactionRepo.deleteById(id);
    }

    private Transaction convertToEntity(TransactionDTO dto) {
        Transaction transaction = new Transaction();
        transaction.setId(dto.getId());
        transaction.setDescription(dto.getDescription());
        transaction.setAmount(dto.getAmount());
        transaction.setDate(dto.getDate());
        transaction.setType(dto.getType());

        if (dto.getAccountId() != null) {
            Account account = accountService.getAccountEntityById(dto.getAccountId());
            transaction.setAccount(account);
        }

        if (dto.getCategoryId() != null) {
            Category category = categoryService.getCategoryEntityById(dto.getCategoryId());
            transaction.setCategory(category);
        }

        return transaction;
    }
}