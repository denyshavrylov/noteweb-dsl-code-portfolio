package com.noteinweb.paas.cloud.lambda.drivercrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.noteinweb.paas.cloud.lambda.drivercrud.model.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, String> {
  Optional < Driver > findById(String id);
}
