package com.cg.iba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.iba.entities.Admin;

@Repository
public interface IAdminRepository extends JpaRepository<Admin,Long>{

	
}
