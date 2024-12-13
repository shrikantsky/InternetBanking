package com.cg.iba.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Customer;
import com.cg.iba.entities.SavingsAccount;
import com.cg.iba.entities.TermAccount;
import com.cg.iba.entities.Transaction;
import com.cg.iba.entities.TransactionStatus;
import com.cg.iba.entities.TransactionType;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.exception.InvalidAmountException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.exception.LowBalanceException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.ICustomerRepository;
import com.cg.iba.repository.ITransactionRepository;

@Service
public class AccountServiceImpl implements IAccountService {

	@Autowired
	private IAccountRepository accountRepository;

	@Autowired
	private ICustomerRepository customerRepository;

	@Autowired
	private ITransactionRepository transactionRepository;

	// complete
	@Override
	public Transaction transferMoney(long senderAccountId, long receiverAccountId, double amount)
			throws LowBalanceException, InvalidAccountException {

		// finding sender's account
		Optional<Account> optAcc = accountRepository.findById(senderAccountId);

		if (optAcc.isEmpty()) {
			throw new InvalidAccountException("Invalid Account Id : " + senderAccountId);
		}

		Account acc = optAcc.get();

		// check sender's balance
		if (acc.getBalance() < amount) {
			throw new LowBalanceException("Insufficient Balance.");
		}

		// finding receiver's account
		Optional<Account> optAccRec = accountRepository.findById(receiverAccountId);

		if (optAccRec.isEmpty()) {
			throw new InvalidAccountException("Invalid Account Id : " + receiverAccountId);
		}

		Account accRec = optAccRec.get();

		double sendBalance = acc.getBalance() - amount;
		acc.setBalance(sendBalance);

		accountRepository.save(acc);

		double recBalance = accRec.getBalance() + amount;
		accRec.setBalance(recBalance);

		accountRepository.save(accRec);

		Transaction transaction = new Transaction();
		transaction.setAmount(amount);
		transaction.setTransactionType(TransactionType.CREDIT);
		transaction.setDateTime(LocalDateTime.now());
		transaction.setAccount(acc);
		transaction.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction.setTransactionRemarks("demo");
		transactionRepository.save(transaction);
		return transaction;
	}

	@Override
	public Transaction withdraw(long accountId, double amount) throws LowBalanceException, InvalidAccountException {

		Optional<Account> optAcc = accountRepository.findById(accountId);

		if (optAcc.isEmpty()) {
			throw new InvalidAccountException("Invalid Account Id : " + accountId);
		}

		Account acc = optAcc.get();

		double balance = acc.getBalance() - amount;

		acc.setBalance(balance);

		accountRepository.save(acc);

		Transaction transaction = new Transaction();
		transaction.setAmount(amount);
		transaction.setTransactionType(TransactionType.DEBIT);
		transaction.setDateTime(LocalDateTime.now());
		transaction.setAccount(acc);
		transaction.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction.setTransactionRemarks("demo");
		transactionRepository.save(transaction);
		return transaction;
	}

	@Override
	public Transaction deposit(long accountId, double amount) throws InvalidAccountException, InvalidAmountException {

		Optional<Account> optAcc = accountRepository.findById(accountId);

		if (optAcc.isEmpty()) {
			throw new InvalidAccountException("Invalid Account Id : " + accountId);
		}

		if (amount < 100) {
			throw new InvalidAmountException("Invalid Amount.");
		}

		Account acc = optAcc.get();

		double balance = acc.getBalance() + amount;

		acc.setBalance(balance);

		accountRepository.save(acc);

		Transaction transaction = new Transaction();
		transaction.setTransactionId(4);
		transaction.setAmount(amount);
		transaction.setTransactionType(TransactionType.CREDIT);
		transaction.setDateTime(LocalDateTime.now());
		transaction.setAccount(acc);
		transaction.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction.setTransactionRemarks("demo");

		transactionRepository.save(transaction);

		return transaction;
	}

	@Override
	public SavingsAccount addSavingsAccount(SavingsAccount saving) throws InvalidDetailsException {

		return accountRepository.save(saving);

	}

	@Override
	public TermAccount addTermAccount(TermAccount term) throws InvalidDetailsException {

		return accountRepository.save(term);

	}

	@Override
	public SavingsAccount updateSavingsAccount(SavingsAccount saving) throws InvalidDetailsException {

		Optional<Account> optSavingAcc = accountRepository.findById(saving.getAccountId());

		if (optSavingAcc.isEmpty()) {
			throw new InvalidDetailsException("Invalid Details.");
		}

		return accountRepository.save(saving);

	}

	@Override
	public TermAccount updateTermAccount(TermAccount term) throws InvalidDetailsException {

		Optional<Account> optTermAcc = accountRepository.findById(term.getAccountId());

		if (optTermAcc.isEmpty()) {
			throw new InvalidDetailsException("Invalid Details.");
		}

		return accountRepository.save(term);

	}

	@Override
	public boolean closeSavingsAccount(long accountNo) throws InvalidAccountException {

		Optional<Account> optSavingAcc = accountRepository.findById(accountNo);

		if (optSavingAcc.isEmpty()) {
			throw new InvalidAccountException("Invalid Account Id : " + accountNo);
		}

		accountRepository.deleteById(accountNo);

		return false;
	}

	@Override
	public boolean closeTermAccount(long accountNo) throws InvalidAccountException {

		Optional<Account> optTermAcc = accountRepository.findById(accountNo);

		if (optTermAcc.isEmpty()) {
			throw new InvalidAccountException("Inavlid Account Id : " + accountNo);
		}

		accountRepository.deleteById(accountNo);

		return false;
	}

	@Override
	public Account findAccountById(long account_id) throws InvalidAccountException {

		Optional<Account> optAcc = accountRepository.findById(account_id);

		if (optAcc.isEmpty()) {
			throw new InvalidAccountException("Inavlid Account Id : " + account_id);
		}

		return optAcc.get();

	}

	@Override
	public Set<Account> viewAccounts(long customerId) throws DetailsNotFoundException {

		Optional<Customer> optCust = customerRepository.findById(customerId);

		if (optCust.isEmpty()) {
			throw new DetailsNotFoundException("Inavlid Account Id : " + customerId);
		}

		Customer customer = optCust.get();

		return customer.getAccount();
	}

}
