package com.cg.iba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.iba.entities.Beneficiary;

@Repository
public interface IBeneficiaryRepository extends JpaRepository<Beneficiary,Long>{

	
}
