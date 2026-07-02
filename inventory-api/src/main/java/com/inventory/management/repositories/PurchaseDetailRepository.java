package com.inventory.management.repositories;

import com.inventory.management.entities.PurchaseDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, Long> {

}
