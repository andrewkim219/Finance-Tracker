package org.myfinanceapp.financeapp.repos;

import org.myfinanceapp.financeapp.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findTransactionById(Long id);
    List<Transaction> findAllByAccountId(Long accountId);
    List<Transaction> findAllByCategoryId(Long categoryId);
    List<Transaction> findAllByAccount_User_Id(Long userId);
    List<Transaction> findAllByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Transaction> findAllByAmount(Double amount);
}
