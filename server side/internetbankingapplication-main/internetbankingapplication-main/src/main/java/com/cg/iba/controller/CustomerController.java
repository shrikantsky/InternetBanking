package com.cg.iba.controller;

import java.util.Set;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.iba.entities.Customer;
import com.cg.iba.service.ICustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

	@Autowired
	private ICustomerService icustomerservice;

	@PostMapping("/add")
	public ResponseEntity<Object> addCustomer(@Valid @RequestBody Customer customer) {
		Customer cust = icustomerservice.addCustomer(customer);

		return new ResponseEntity<>(cust, HttpStatus.CREATED);

		
	}

	@PutMapping("/update")
	public ResponseEntity<Object> updateCustomer(@Valid @RequestBody Customer customer) {
		Customer cust = icustomerservice.updateCustomer(customer);

		return  new ResponseEntity<>(cust, HttpStatus.OK);

		
	}

	@DeleteMapping("/delete/{customer_id}")
	public ResponseEntity<Object> deleteCustomer(@PathVariable("customer_id") long customer_id) {
		icustomerservice.deleteCustomer(customer_id);
		return  new ResponseEntity<>("customer deleted ", HttpStatus.OK);
		

	}

	@GetMapping("/all/{minBalance}")
	public ResponseEntity<Object> listAllCustomers(@PathVariable double minBalance)  {
		Set<Customer> cust = icustomerservice.listAllCustomers(minBalance);
		return new ResponseEntity<>(cust, HttpStatus.OK);
		

	}

	@GetMapping("/find/{customer_id}")
	public Customer findCustomerById(@PathVariable("customer_id") long customer_id) {
		return icustomerservice.findCustomerById(customer_id);

	}

}



