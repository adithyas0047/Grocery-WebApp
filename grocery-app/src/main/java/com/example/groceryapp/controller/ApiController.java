package com.example.groceryapp.controller;

import com.example.groceryapp.model.AppUser;
import com.example.groceryapp.model.GroceryItem;
import com.example.groceryapp.repository.AppUserRepository;
import com.example.groceryapp.repository.GroceryItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {

    private final GroceryItemRepository itemRepo;
    private final AppUserRepository userRepo;

    public ApiController(GroceryItemRepository itemRepo, AppUserRepository userRepo) {
        this.itemRepo = itemRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        Optional<AppUser> user = userRepo.findByUsername(username);
        
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok().body(Map.of(
                "userId", user.get().getId(),
                "username", user.get().getUsername()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registration) {
        String username = registration.get("username");
        String password = registration.get("password");
        
        if (userRepo.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        
        AppUser newUser = new AppUser(username, password);
        AppUser savedUser = userRepo.save(newUser);
        
        return ResponseEntity.ok().body(Map.of(
            "userId", savedUser.getId(),
            "username", savedUser.getUsername(),
            "message", "Registration successful"
        ));
    }
    
    @GetMapping("/items")
    public ResponseEntity<?> getGroceryItems(@RequestParam Long userId) {
        Optional<AppUser> user = userRepo.findById(userId);
        
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }
        
        List<GroceryItem> items = itemRepo.findByUser(user.get());
        return ResponseEntity.ok(items);
    }
    
    @PostMapping("/items")
    public ResponseEntity<?> addGroceryItem(@RequestBody Map<String, Object> payload) {
        Long userId = Long.parseLong(payload.get("userId").toString());
        String name = payload.get("name").toString();
        double price = Double.parseDouble(payload.get("price").toString());
        
        Optional<AppUser> user = userRepo.findById(userId);
        
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }
        
        GroceryItem item = new GroceryItem(name, price, user.get());
        GroceryItem savedItem = itemRepo.save(item);
        
        return ResponseEntity.ok(savedItem);
    }
    
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> deleteGroceryItem(@PathVariable Long itemId, @RequestParam Long userId) {
        Optional<GroceryItem> item = itemRepo.findById(itemId);
        Optional<AppUser> user = userRepo.findById(userId);
        
        if (item.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        if (user.isEmpty() || !item.get().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body(Map.of("error", "Not authorized to delete this item"));
        }
        
        itemRepo.deleteById(itemId);
        return ResponseEntity.ok().body(Map.of("message", "Item deleted successfully"));
    }
}
