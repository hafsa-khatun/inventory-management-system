package com.inventory.management.services;

import com.inventory.management.daos.CategoryDao;
import com.inventory.management.entities.Catagory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryDao dao;

    public Catagory save(Catagory catagory) {
        return dao.save(catagory);
    }

    public List<Catagory> getAll() {
        return dao.getAll();
    }

    public Catagory getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
