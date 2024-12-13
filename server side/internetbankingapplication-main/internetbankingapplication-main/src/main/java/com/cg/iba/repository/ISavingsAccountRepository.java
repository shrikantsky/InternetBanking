package com.cg.iba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.iba.entities.SavingsAccount;

@Repository
public interface ISavingsAccountRepository extends JpaRepository<SavingsAccount,Long>{

	
	
}
