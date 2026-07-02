package com.inventory.management.services;

import com.inventory.management.daos.ProductDao;
import com.inventory.management.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductDao dao;

    public Product save(Product product) {
        return dao.save(product);
    }

    public List<Product> getAll() {
        return dao.getAll();
    }

    public Product getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
