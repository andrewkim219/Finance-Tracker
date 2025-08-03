package org.myfinanceapp.financeapp.controllers;

import org.myfinanceapp.financeapp.models.Category;
import org.myfinanceapp.financeapp.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

    CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/")
    public ResponseEntity<String> addCategory(Category category) {
        categoryService.addCategory(category);
        return ResponseEntity.status(201).body("Category added successfully.");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(Category category) {
        categoryService.updateCategory(category);
        return ResponseEntity.ok("Category updated successfully.");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCategory(Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category deleted successfully.");
    }

}
