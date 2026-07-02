package com.inventory.management.controllers;

import com.inventory.management.entities.Purchase;
import com.inventory.management.services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchases")
public class PurchaseController {
    @Autowired
    private PurchaseService service;

    @PostMapping
    public Purchase save(@RequestBody Purchase purchase) {
        return service.save(purchase);
    }

    @GetMapping
    public List<Purchase> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Purchase getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Purchase Record Deleted Successfully";
    }

}
