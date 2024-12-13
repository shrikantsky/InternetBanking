package com.cg.iba.service;

import com.cg.iba.entities.Admin;
import com.cg.iba.entities.User;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.InvalidDetailsException;

public interface IUserService {

	public Admin signInAdmin(long userId, String password) throws InvalidDetailsException;

	public User signIn(long userId, String password) throws InvalidDetailsException;

	public boolean deleteUserInfo(long userId) throws DetailsNotFoundException;

}