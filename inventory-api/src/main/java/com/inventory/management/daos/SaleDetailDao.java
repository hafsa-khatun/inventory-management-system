package com.inventory.management.daos;

import com.inventory.management.entities.SaleDetail;
import com.inventory.management.repositories.SaleDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SaleDetailDao {
    @Autowired
    private SaleDetailRepository repository;

    public SaleDetail save(SaleDetail detail) {
        return repository.save(detail);
    }

    public List<SaleDetail> getAll() {
        return repository.findAll();
    }

    public SaleDetail getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
