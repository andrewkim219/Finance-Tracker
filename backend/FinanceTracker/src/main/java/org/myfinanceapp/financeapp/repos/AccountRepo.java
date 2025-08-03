package org.myfinanceapp.financeapp.repos;

import org.myfinanceapp.financeapp.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account, Long> {

    Optional<Account> findAccountById(Long id);
    Optional<Account> findAccountByUserId(Long userId);
    List<Account> findAllByUserId(Long userId);

}
