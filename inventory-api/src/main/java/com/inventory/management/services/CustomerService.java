package com.inventory.management.services;

import com.inventory.management.daos.CustomerDao;
import com.inventory.management.entities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerDao dao;

    public Customer save(Customer customer) {
        return dao.save(customer);
    }

    public List<Customer> getAll() {
        return dao.getAll();
    }

    public Customer getById(Long id) {
        return dao.getById(id);
    }

    public void delete(Long id) {
        dao.delete(id);
    }
}
