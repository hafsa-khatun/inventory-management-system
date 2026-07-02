package com.inventory.management.daos;

import com.inventory.management.entities.Sale;
import com.inventory.management.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SaleDao {
    @Autowired
    private SaleRepository repository;

    public Sale save(Sale sale) {
        return repository.save(sale);
    }

    public List<Sale> getAll() {
        return repository.findAll();
    }

    public Sale getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}
