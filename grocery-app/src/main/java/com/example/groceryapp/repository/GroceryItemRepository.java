package com.example.groceryapp.repository;

import com.example.groceryapp.model.GroceryItem;
import com.example.groceryapp.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroceryItemRepository extends JpaRepository<GroceryItem, Long> {
    List<GroceryItem> findByUser(AppUser user);
}
