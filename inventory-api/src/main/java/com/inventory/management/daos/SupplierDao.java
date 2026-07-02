package com.inventory.management.daos;

import com.inventory.management.entities.Supplier;
import com.inventory.management.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupplierDao {
    @Autowired
    private SupplierRepository repository;

    public Supplier save(Supplier supplier) {
        return repository.save(supplier);
    }

    public List<Supplier> getAll() {
        return repository.findAll();
    }

    public Supplier getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
