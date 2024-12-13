package com.cg.iba.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import com.cg.iba.entities.Transaction;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidAccountException;

public interface ITransactionService {

	public Transaction findTransactionById(long transaction_id) throws DetailsNotFoundException;

	public Set<Transaction> listAllTransactions(long accountId, LocalDate from, LocalDate to)
			throws InvalidAccountException, EmptyListException;

	public Set<Transaction> getAllMyAccTransactions(long account_id) throws InvalidAccountException, EmptyListException;
}
