package com.cg.iba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.iba.entities.TermAccount;

@Repository
public interface ITermAccountRepository extends JpaRepository<TermAccount,Long> {

	
}
