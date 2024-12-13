package com.cg.iba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.iba.entities.Customer;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer,Long>{

}
