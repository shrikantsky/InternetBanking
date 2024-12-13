package com.cg.iba.service;

import java.util.Set;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.SavingsAccount;
import com.cg.iba.entities.TermAccount;
import com.cg.iba.entities.Transaction;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.exception.InvalidAmountException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.exception.LowBalanceException;

public interface IAccountService {

	public Transaction transferMoney(long senderAccountId, long receiverAccountId, double amount)
			throws LowBalanceException, InvalidAccountException;

	public Transaction withdraw(long accountId, double amount) throws LowBalanceException, InvalidAccountException;

	public Transaction deposit(long accountId, double amount) throws InvalidAccountException, InvalidAmountException;

	public SavingsAccount addSavingsAccount(SavingsAccount saving) throws InvalidDetailsException;

	public TermAccount addTermAccount(TermAccount term) throws InvalidDetailsException;

	public SavingsAccount updateSavingsAccount(SavingsAccount saving) throws InvalidDetailsException;

	public TermAccount updateTermAccount(TermAccount term) throws InvalidDetailsException;

	public boolean closeSavingsAccount(long accountNo) throws InvalidAccountException;

	public boolean closeTermAccount(long accountNo) throws InvalidAccountException;

	public Account findAccountById(long account_id) throws InvalidAccountException;

	public Set<Account> viewAccounts(long customerId) throws DetailsNotFoundException;

}
