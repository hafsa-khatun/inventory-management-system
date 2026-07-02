package com.inventory.management.controllers;

import com.inventory.management.entities.PurchaseDetail;
import com.inventory.management.services.PurchaseDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase-details")
public class PurchaseDetailController {
    @Autowired
    private PurchaseDetailService service;

    @PostMapping
    public PurchaseDetail save(@RequestBody PurchaseDetail detail) {
        return service.save(detail);
    }

    @GetMapping
    public List<PurchaseDetail> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public PurchaseDetail getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Purchase Detail Record Deleted Successfully";
    }

}
