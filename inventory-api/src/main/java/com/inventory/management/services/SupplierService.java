package com.inventory.management.services;

import com.inventory.management.daos.SupplierDao;
import com.inventory.management.entities.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierDao dao;

    public Supplier save(Supplier supplier) {
        return dao.save(supplier);
    }

    public List<Supplier> getAll() {
        return dao.getAll();
    }

    public Supplier getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
