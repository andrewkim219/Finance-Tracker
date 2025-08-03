package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.Transaction;
import org.myfinanceapp.financeapp.repos.TransactionRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    TransactionRepo transactionRepo;

    public TransactionService(TransactionRepo transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

    public Transaction getTransactionById(Long id) {
        if (transactionRepo.findTransactionById(id).isPresent()) {
            return transactionRepo.findTransactionById(id).get();
        } else {
            throw new RuntimeException("Transaction not found with id: " + id);
        }
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        if (transactionRepo.findAllByAccountId(accountId).isEmpty()) {
            throw new RuntimeException("No transactions found for account id: " + accountId);
        }
        return transactionRepo.findAllByAccountId(accountId);
    }

    public void addTransaction(Transaction transaction) {
        if (transactionRepo.findTransactionById(transaction.getId()).isPresent()) {
            throw new RuntimeException("Transaction already exists with id: " + transaction.getId());
        }
        transactionRepo.save(transaction);
    }

    public void updateTransaction(Transaction transaction) {
        if (transactionRepo.findTransactionById(transaction.getId()).isPresent()) {
            transactionRepo.save(transaction);
        } else {
            throw new RuntimeException("Transaction not found with id: " + transaction.getId());
        }
    }

    public void deleteTransaction(Long id) {
        if (transactionRepo.findTransactionById(id).isEmpty()) {
            throw new RuntimeException("Transaction not found with id: " + id);
        }
        transactionRepo.deleteById(id);
    }

    public List<Transaction> getTransactionsByCategoryId(Long categoryId) {
        if (transactionRepo.findAllByCategoryId(categoryId).isEmpty()) {
            throw new RuntimeException("No transactions found for category id: " + categoryId);
        }
        return transactionRepo.findAllByCategoryId(categoryId);
    }

    public List<Transaction> getTransactionsByUserId(Long userId) {
        if (transactionRepo.findAllByAccount_User_Id(userId).isEmpty()) {
            throw new RuntimeException("No transactions found for user id: " + userId);
        }
        return transactionRepo.findAllByAccount_User_Id(userId);
    }

    public List<Transaction> getTransactionsByDateRange(LocalDate startDate, LocalDate endDate) {
        if (transactionRepo.findAllByDateBetween(startDate, endDate).isEmpty()) {
            throw new RuntimeException("No transactions found between dates: " + startDate + " and " + endDate);
        }
        return transactionRepo.findAllByDateBetween(startDate, endDate);
    }

    public List<Transaction> getTransactionsByAmount(Double amount) {
        if (transactionRepo.findAllByAmount(amount).isEmpty()) {
            throw new RuntimeException("No transactions found with amount: " + amount);
        }
        return transactionRepo.findAllByAmount(amount);
    }


}
