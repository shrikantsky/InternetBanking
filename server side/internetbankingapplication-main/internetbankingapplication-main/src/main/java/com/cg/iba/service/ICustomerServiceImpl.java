package com.cg.iba.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Customer;
import com.cg.iba.entities.SavingsAccount;
import com.cg.iba.entities.TermAccount;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.ICustomerRepository;
import com.cg.iba.repository.ISavingsAccountRepository;
import com.cg.iba.repository.ITermAccountRepository;

@Service
public class ICustomerServiceImpl implements ICustomerService {

	@Autowired
	private ICustomerRepository icustomerrepository;

	@Autowired
	private ISavingsAccountRepository isavingsaccountrepository;
	
	

	@Override
	public Customer addCustomer(Customer customer) throws InvalidDetailsException {
		return icustomerrepository.save(customer);
		
	}

	@Override
	public Customer updateCustomer(Customer customer) throws InvalidDetailsException {
		Optional<Customer> optionalCustomer = icustomerrepository.findById(customer.getUserId());
		if (optionalCustomer.isEmpty()) {
			throw new InvalidDetailsException("invalid detail" + customer.getUserId());
		}
		return  icustomerrepository.save(customer);
	}

	@Override
	public boolean deleteCustomer(long customer_id) throws DetailsNotFoundException {
		Optional<Customer> optionalCustomer = icustomerrepository.findById(customer_id);
		if (optionalCustomer.isEmpty()) {
			throw new DetailsNotFoundException("customer not existing with this id" + customer_id);
		}
		icustomerrepository.deleteById(customer_id);
		return true;

	}

	@Override
	public Set<Customer> listAllCustomers(double minBalance) throws EmptyListException {
		List<SavingsAccount> savingsaccount = isavingsaccountrepository.findAll();
		Set<Customer> customers = new HashSet<>();

		for (SavingsAccount s : savingsaccount) {
			if (s.getMinBalance() == minBalance) {
				customers.add(s.getCustomer());
			}
		}

		return customers;
	}

	@Override
	public Customer findCustomerById(long customer_id) throws DetailsNotFoundException {
		Optional<Customer> optionalCustomer = icustomerrepository.findById(customer_id);
		if (optionalCustomer.isEmpty()) {
			throw new DetailsNotFoundException("customer not existing with this id:" + customer_id);
		}
		 return optionalCustomer.get();
		
	}

}
