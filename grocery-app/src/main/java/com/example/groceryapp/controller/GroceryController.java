package com.example.groceryapp.controller;

import com.example.groceryapp.model.GroceryItem;
import com.example.groceryapp.model.AppUser;
import com.example.groceryapp.repository.GroceryItemRepository;
import com.example.groceryapp.repository.AppUserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Controller
public class GroceryController {

    private final GroceryItemRepository itemRepo;
    private final AppUserRepository userRepo;

    public GroceryController(GroceryItemRepository itemRepo, AppUserRepository userRepo) {
        this.itemRepo = itemRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/")
    public String home(Model model, @SessionAttribute(name = "user", required = false) AppUser user) {
        if (user == null) return "redirect:/login";

        List<GroceryItem> items = itemRepo.findByUser(user);
        double total = items.stream().mapToDouble(GroceryItem::getPrice).sum();

        model.addAttribute("items", items);
        model.addAttribute("total", total);
        model.addAttribute("username", user.getUsername());
        return "index";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/login")
    public RedirectView login(@RequestParam String username, @RequestParam String password, HttpSession session) {
        Optional<AppUser> user = userRepo.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            session.setAttribute("user", user.get());
            return new RedirectView("/");
        } else {
            return new RedirectView("/login?error");
        }
    }

    @GetMapping("/register")
    public String registerForm() {
        return "register";
    }

    @PostMapping("/register")
    public RedirectView register(@RequestParam String username, @RequestParam String password) {
        if (userRepo.findByUsername(username).isPresent()) {
            return new RedirectView("/register?error");
        }
        userRepo.save(new AppUser(username, password));
        return new RedirectView("/login?registered");
    }

    @PostMapping("/add")
    public String addItem(@RequestParam String name, @RequestParam double price,
                          @SessionAttribute(name = "user", required = false) AppUser user) {
        if (user != null && !name.isBlank() && price > 0) {
            itemRepo.save(new GroceryItem(name, price, user));
        }
        return "redirect:/";
    }

    @PostMapping("/remove")
    public String removeItem(@RequestParam Long id) {
        itemRepo.deleteById(id);
        return "redirect:/";
    }

    @GetMapping("/logout")
    public RedirectView logout(HttpSession session) {
        session.invalidate();
        return new RedirectView("/login");
    }
}
