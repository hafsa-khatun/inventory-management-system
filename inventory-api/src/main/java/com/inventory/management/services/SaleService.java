package com.inventory.management.services;

import com.inventory.management.daos.SaleDao;
import com.inventory.management.entities.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {
    @Autowired
    private SaleDao dao;

    public Sale save(Sale sale) {
        return dao.save(sale);
    }

    public List<Sale> getAll() {
        return dao.getAll();
    }

    public Sale getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
