package com.noteinweb.paas.cloud.lambda.customercrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.noteinweb.paas.cloud.lambda.customercrud.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
  Optional < Customer > findById(Integer id);
}
