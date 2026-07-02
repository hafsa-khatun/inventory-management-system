package com.inventory.management.daos;

import com.inventory.management.entities.PurchaseDetail;
import com.inventory.management.repositories.PurchaseDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PurchaseDetailDao {
    @Autowired
    private PurchaseDetailRepository repository;

    public PurchaseDetail save(PurchaseDetail detail) {
        return repository.save(detail);
    }

    public List<PurchaseDetail> getAll() {
        return repository.findAll();
    }

    public PurchaseDetail getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
