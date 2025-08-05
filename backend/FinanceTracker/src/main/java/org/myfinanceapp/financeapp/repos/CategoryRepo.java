package org.myfinanceapp.financeapp.repos;

import org.myfinanceapp.financeapp.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    List<Category> findByUserId(Long userId);
}
