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

import com.cg.iba.entities.Account;
import com.cg.iba.entities.SavingsAccount;
import com.cg.iba.entities.TermAccount;
import com.cg.iba.entities.Transaction;
import com.cg.iba.model.TransactionRequest;
import com.cg.iba.model.TransactionResponse;
import com.cg.iba.service.IAccountService;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

	@Autowired
	private IAccountService accountService;

	@PostMapping("/transfer")
	public ResponseEntity<Object> transferMoney(@RequestBody TransactionRequest transactionRequest) {

		Transaction transaction = accountService.transferMoney(transactionRequest.getAccountId(), transactionRequest.getReceiverAccountId(), transactionRequest.getAmount());

		TransactionResponse transactionResponse = new TransactionResponse();
		transactionResponse.setTransactionType(transaction.getTransactionType());
		transactionResponse.setTransactionStatus(transaction.getTransactionStatus());
		transactionResponse.setTransactionRemarks(transaction.getTransactionRemarks());
		transactionResponse.setDateTime(transaction.getDateTime());
		transactionResponse.setAmount(transaction.getAmount());
		transactionResponse.setAccount(transaction.getAccount());
		
		return new ResponseEntity<>(transactionResponse, HttpStatus.OK);
	}

	@PostMapping("/savingsaccount/add")
	public ResponseEntity<Object> addSavingsAccount(@Valid @RequestBody SavingsAccount saving) {

		SavingsAccount savAcc = accountService.addSavingsAccount(saving);

		return new ResponseEntity<>(savAcc, HttpStatus.CREATED);
	}

	@PutMapping("/savingsaccount/update")
	public ResponseEntity<Object> updateSavingsAccount(@Valid @RequestBody SavingsAccount saving) {

		SavingsAccount updatedAcc = accountService.updateSavingsAccount(saving);

		return new ResponseEntity<>(updatedAcc, HttpStatus.OK);
	}

	@PostMapping("/termaccount/add")
	public ResponseEntity<Object> addTermAccount(@Valid @RequestBody TermAccount term) {

		TermAccount termAcc = accountService.addTermAccount(term);

		return new ResponseEntity<>(termAcc, HttpStatus.CREATED);
	}

	@PutMapping("/termaccount/update")
	public ResponseEntity<Object> updateTermAccount(@Valid @RequestBody TermAccount term) {

		TermAccount updatedAcc = accountService.updateTermAccount(term);

		return new ResponseEntity<>(updatedAcc, HttpStatus.OK);
	}

	@PostMapping("/withdraw")
	public ResponseEntity<Object> withdraw(@RequestBody TransactionRequest transactionRequest) {

		Transaction transaction = accountService.withdraw(transactionRequest.getAccountId(), transactionRequest.getAmount());

		TransactionResponse transactionResponse = new TransactionResponse();
		transactionResponse.setTransactionType(transaction.getTransactionType());
		transactionResponse.setTransactionStatus(transaction.getTransactionStatus());
		transactionResponse.setTransactionRemarks(transaction.getTransactionRemarks());
		transactionResponse.setDateTime(transaction.getDateTime());
		transactionResponse.setAmount(transaction.getAmount());
		transactionResponse.setAccount(transaction.getAccount());
		
		return new ResponseEntity<>(transactionResponse, HttpStatus.OK);
	}

	@PostMapping("/deposit")
	public ResponseEntity<Object> deposit(@RequestBody TransactionRequest transactionRequest) {

		Transaction transaction = accountService.deposit(transactionRequest.getAccountId(), transactionRequest.getAmount());

		TransactionResponse transactionResponse = new TransactionResponse();
		transactionResponse.setTransactionType(transaction.getTransactionType());
		transactionResponse.setTransactionStatus(transaction.getTransactionStatus());
		transactionResponse.setTransactionRemarks(transaction.getTransactionRemarks());
		transactionResponse.setDateTime(transaction.getDateTime());
		transactionResponse.setAmount(transaction.getAmount());
		transactionResponse.setAccount(transaction.getAccount());
		
		return new ResponseEntity<>(transactionResponse, HttpStatus.OK);
	}

	@DeleteMapping("/savingsaccount/close/{accountNo}")
	public ResponseEntity<Object> closeSavingsAccount(@PathVariable("accountNo") long accountNo) {

		accountService.closeSavingsAccount(accountNo);

		return new ResponseEntity<>("Account Closed Successfully.", HttpStatus.OK);
	}

	@DeleteMapping("/termaccount/close/{accountNo}")
	public ResponseEntity<Object> closeTermAccount(@PathVariable("accountNo") long accountNo) {

		accountService.closeTermAccount(accountNo);

		return new ResponseEntity<>("Account Closed Successfully.", HttpStatus.OK);
	}

	@GetMapping("/find/{account_id}")
	public ResponseEntity<Object> findAccountById(@PathVariable("account_id") long account_id) {

		Account account = accountService.findAccountById(account_id);

		return new ResponseEntity<>(account, HttpStatus.OK);
	}

	@GetMapping("/all/{customerId}")
	public ResponseEntity<Object> viewAccounts(@PathVariable("customerId") long customerId) {

		Set<Account> savAcc = accountService.viewAccounts(customerId);

		return new ResponseEntity<>(savAcc, HttpStatus.OK);
	}

}
