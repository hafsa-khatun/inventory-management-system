package com.inventory.management.services;

import com.inventory.management.daos.PurchaseDetailDao;
import com.inventory.management.entities.PurchaseDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseDetailService {
    @Autowired
    private PurchaseDetailDao dao;

    public PurchaseDetail save(PurchaseDetail detail) {
        return dao.save(detail);
    }

    public List<PurchaseDetail> getAll() {
        return dao.getAll();
    }

    public PurchaseDetail getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
