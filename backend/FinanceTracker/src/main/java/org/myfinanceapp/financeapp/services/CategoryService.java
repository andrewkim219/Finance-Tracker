package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.Category;
import org.myfinanceapp.financeapp.repos.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public void addCategory(Category category) {
        if (categoryRepo.findById(category.getId()).isPresent()) {
            throw new IllegalArgumentException("Category with this ID already exists.");
        }
        categoryRepo.save(category);
    }

    public void updateCategory(Category category) {
        if (categoryRepo.findById(category.getId()).isEmpty()) {
            throw new IllegalArgumentException("Category with this ID does not exist.");
        }
        categoryRepo.save(category);
    }

    public void deleteCategory(Long categoryId) {
        if (categoryRepo.findById(categoryId).isEmpty()) {
            throw new IllegalArgumentException("Category with this ID does not exist.");
        }
        categoryRepo.deleteById(categoryId);
    }
}
