package com.inventory.management.services;

import com.inventory.management.daos.SaleDetailDao;
import com.inventory.management.entities.SaleDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SaleDetailService {
    @Autowired
    private SaleDetailDao dao;

    public SaleDetail save(SaleDetail detail) {
        return dao.save(detail);
    }

    public List<SaleDetail> getAll() {
        return dao.getAll();
    }

    public SaleDetail getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
