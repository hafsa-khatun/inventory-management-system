package com.inventory.management.repositories;

import com.inventory.management.entities.Catagory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Catagory,Long> {


}
