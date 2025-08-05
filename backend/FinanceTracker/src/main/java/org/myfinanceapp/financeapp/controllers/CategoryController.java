package org.myfinanceapp.financeapp.controllers;

import org.myfinanceapp.financeapp.models.DTO.CategoryDTO;
import org.myfinanceapp.financeapp.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<CategoryDTO>> getAllCategoriesForUser(@PathVariable Long userId) {
        List<CategoryDTO> categories = categoryService.getAllCategoriesForUser(userId);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long categoryId) {
        CategoryDTO category = categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(category);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<String> addCategoryForUser(@PathVariable Long userId, @RequestBody CategoryDTO categoryDTO) {
        categoryService.addCategoryForUser(userId, categoryDTO);
        return ResponseEntity.status(201).body("Category added successfully for user.");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(@RequestBody CategoryDTO categoryDTO) {
        categoryService.updateCategory(categoryDTO);
        return ResponseEntity.ok("Category updated successfully.");
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category deleted successfully.");
    }
}