package com.cg.iba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.iba.entities.Nominee;
@Repository
public interface INomineeRepository extends JpaRepository<Nominee,Long> {

	
}
