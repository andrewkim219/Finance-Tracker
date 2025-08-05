package org.myfinanceapp.financeapp.services;

import org.myfinanceapp.financeapp.models.DTO.CategoryDTO;
import org.myfinanceapp.financeapp.mappers.EntityDtoMapper;
import org.myfinanceapp.financeapp.models.Category;
import org.myfinanceapp.financeapp.models.User;
import org.myfinanceapp.financeapp.repos.CategoryRepo;
import org.myfinanceapp.financeapp.repos.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper mapper;
    private final UserRepo userRepo;

    public CategoryService(CategoryRepo categoryRepo, EntityDtoMapper mapper, UserRepo userRepo) {
        this.categoryRepo = categoryRepo;
        this.mapper = mapper;
        this.userRepo = userRepo;
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepo.findAll().stream()
            .map(mapper::toCategoryDto)
            .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long id) {
        Category category = getCategoryEntityById(id);
        return mapper.toCategoryDto(category);
    }

    // Internal method for other services to use
    public Category getCategoryEntityById(Long id) {
        return categoryRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Category with this ID does not exist."));
    }

    public void addCategory(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        if (categoryDTO.getId() != null && categoryRepo.findById(categoryDTO.getId()).isPresent()) {
            throw new IllegalArgumentException("Category with this ID already exists.");
        }
        categoryRepo.save(category);
    }

    public void updateCategory(CategoryDTO categoryDTO) {
        if (categoryRepo.findById(categoryDTO.getId()).isEmpty()) {
            throw new IllegalArgumentException("Category with this ID does not exist.");
        }
        Category category = convertToEntity(categoryDTO);
        categoryRepo.save(category);
    }

    public void deleteCategory(Long categoryId) {
        if (categoryRepo.findById(categoryId).isEmpty()) {
            throw new IllegalArgumentException("Category with this ID does not exist.");
        }
        categoryRepo.deleteById(categoryId);
    }

    public List<CategoryDTO> getAllCategoriesForUser(Long userId) {
        return categoryRepo.findByUserId(userId).stream()
            .map(mapper::toCategoryDto)
            .collect(Collectors.toList());
    }

    public void addCategoryForUser(Long userId, CategoryDTO categoryDTO) {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User with this ID does not exist."));
        Category category = convertToEntity(categoryDTO);
        category.setUser(user);
        if (categoryDTO.getId() != null && categoryRepo.findById(categoryDTO.getId()).isPresent()) {
            throw new IllegalArgumentException("Category with this ID already exists.");
        }
        categoryRepo.save(category);
    }

    private Category convertToEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setType(dto.getType());
        // user is set in addCategoryForUser
        return category;
    }
}