package com.inventory.management.daos;

import com.inventory.management.repositories.CategoryRepository;
import com.inventory.management.entities.Catagory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryDao {
    @Autowired
    private CategoryRepository repository;

    public Catagory save(Catagory category) {
        return repository.save(category);
    }

    public List<Catagory> getAll() {
        return repository.findAll();
    }

    public Catagory getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
