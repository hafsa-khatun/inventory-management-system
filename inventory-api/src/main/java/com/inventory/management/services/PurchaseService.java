package com.inventory.management.services;

import com.inventory.management.daos.PurchaseDao;
import com.inventory.management.entities.Purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseDao dao;

    public Purchase save(Purchase purchase) {
        return dao.save(purchase);
    }

    public List<Purchase> getAll() {
        return dao.getAll();
    }

    public Purchase getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
