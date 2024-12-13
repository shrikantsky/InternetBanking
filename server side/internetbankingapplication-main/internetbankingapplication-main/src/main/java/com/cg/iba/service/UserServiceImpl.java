package com.cg.iba.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.iba.entities.Admin;
import com.cg.iba.entities.Customer;
import com.cg.iba.entities.User;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.IAdminRepository;
import com.cg.iba.repository.ICustomerRepository;

@Service
public class UserServiceImpl implements IUserService {



	@Autowired
	private IAdminRepository adminRepository;

	@Autowired
	private ICustomerRepository icustomerRepository;

	@Override
	public Admin signInAdmin(long userId, String password) throws InvalidDetailsException {
		Optional<Admin> optionalUser = adminRepository.findById(userId);
		if (optionalUser.isEmpty()) {
			throw new InvalidDetailsException("User not found" + userId);
		}
		Admin ad = optionalUser.get();
		if (!ad.getPassword().equals(password)) {
			throw new InvalidDetailsException("Invalid Password");
		}
		return ad;
	}

	@Override
	public User signIn(long userId, String password) throws InvalidDetailsException {
		Optional<Customer> optionalUser = icustomerRepository.findById(userId);
		if (optionalUser.isEmpty()) {
			throw new InvalidDetailsException("User not found" + userId);
		}

		User user1 = optionalUser.get();
		if (!user1.getPassword().equals(password)) {
			throw new InvalidDetailsException("Invalid Password");
		}
		return user1;
	}

	@Override
	public boolean deleteUserInfo(long userId) throws DetailsNotFoundException {
		Optional<Customer> optionalUser = icustomerRepository.findById(userId);
		if (optionalUser.isEmpty()) {
			throw new DetailsNotFoundException("User not found" + userId);
		}
		icustomerRepository.deleteById(userId);
		return false;
	}

}