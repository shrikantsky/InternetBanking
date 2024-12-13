package com.cg.iba.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.cg.iba.entities.Admin;
import com.cg.iba.entities.User;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.service.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private IUserService iuserservice;

	@GetMapping("/admin/signin/{userId}/{password}")
	public ResponseEntity<Object> signInAdmin(@PathVariable("userId") long userId,
			@PathVariable("password") String password) throws InvalidDetailsException {
		Admin ad = iuserservice.signInAdmin(userId, password);
		return new ResponseEntity<>(ad, HttpStatus.OK);
		
	}

	@GetMapping("/user/signin/{userId}/{password}")
	public ResponseEntity<Object> signIn(@PathVariable("userId") long userId, @PathVariable("password") String password)
			throws InvalidDetailsException {
		User ad = iuserservice.signIn(userId, password);
		return new ResponseEntity<>(ad, HttpStatus.OK);
		
	}

	@DeleteMapping("/user/delete/{userId}")
	public ResponseEntity<Object> deleteUserInfo(@PathVariable("userId") long userId) throws DetailsNotFoundException {
		iuserservice.deleteUserInfo(userId);
		return new ResponseEntity<>("user deleted", HttpStatus.OK);
		
	}

}