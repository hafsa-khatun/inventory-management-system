package com.inventory.management.controllers;

import com.inventory.management.entities.SaleDetail;
import com.inventory.management.services.SaleDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sale-details")
public class SaleDetailController {
    @Autowired
    private SaleDetailService service;

    @PostMapping
    public SaleDetail save(@RequestBody SaleDetail detail) {
        return service.save(detail);
    }

    @GetMapping
    public List<SaleDetail> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public SaleDetail getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Sale Detail Record Deleted Successfully";
    }
}
