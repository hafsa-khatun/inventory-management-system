package com.inventory.management.controllers;

import com.inventory.management.entities.Catagory;
import com.inventory.management.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CatagoryController {
    @Autowired
    private CategoryService service;

    @PostMapping
    public Catagory save(@RequestBody Catagory catagory) {
        return service.save(catagory);
    }

    @GetMapping
    public List<Catagory> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Catagory getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Category Deleted";
    }
}
