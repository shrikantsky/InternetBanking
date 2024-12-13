package com.cg.iba.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Transaction;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.ITransactionRepository;

import java.util.HashSet;
import java.util.Optional;

@Service
public class ITransactionServiceImpl implements ITransactionService {
	@Autowired
	private ITransactionRepository itransactionRepository;
	@Autowired
	private IAccountRepository iAccountRepository;

	@Override
	public Transaction findTransactionById(long transaction_id) { // method to find transaction by transaction_id

		Optional<Transaction> optionalTransaction = itransactionRepository.findById(transaction_id);

		if (optionalTransaction.isEmpty()) {
			throw new DetailsNotFoundException("NO DETIALS FOUND WITH THIS TRANSACTION ID" + transaction_id);
		}
		return optionalTransaction.get();

	}

	@Override
	public Set<Transaction> getAllMyAccTransactions(long accountId) { // method to find all transaction by account_id

		Optional<Account> optionalAccount = iAccountRepository.findById(accountId);

		if (optionalAccount.isEmpty()) {
			throw new InvalidAccountException("NO ACCOUNT IS EXISTING WITH THIS ACCOUNT ID" + accountId);
		}

		Account account = optionalAccount.get();

		Set<Transaction> alltransaction = account.getTransactions();
		if (alltransaction.isEmpty()) {
			throw new EmptyListException("NO TRANSACTION EXITS WITH THIS ACCOUNT ID" + accountId);
		}

		return alltransaction;

	}

	@Override
	public Set<Transaction> listAllTransactions(long accountId, LocalDate from, LocalDate to) {
		Optional<Account> optionalAccount = iAccountRepository.findById(accountId);

		if (optionalAccount.isEmpty()) {
			throw new InvalidAccountException("NO ACCOUNT IS EXISTING WITH THIS ACCOUNT ID" + accountId);
		}

		Account account = optionalAccount.get();

		Set<Transaction> alltransaction = account.getTransactions();

		Set<Transaction> alltranbetween = new HashSet<>();

		for (Transaction t : alltransaction) {
			LocalDate date = t.getDateTime().toLocalDate();
			if (date.compareTo(from) >= 0 && date.compareTo(to) <= 0) {
				alltranbetween.add(t);
			}

		}

		if (alltranbetween.isEmpty()) {
			throw new EmptyListException("NO TRANSACTION EXITS WITH THIS ACCOUNT ID" + accountId);
		}
		return alltranbetween;

	}

}