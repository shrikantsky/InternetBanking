package com.cg.iba.controller;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.iba.entities.Transaction;
import com.cg.iba.model.TransactionGetPayload;
import com.cg.iba.service.ITransactionServiceImpl;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

	@Autowired
	private ITransactionServiceImpl itransactionServiceImpl;

	@GetMapping("/viewbyid/{transactionId}") // method to find transaction by transaction_id
	public ResponseEntity<Transaction> displayTransactionByTransactionId(@PathVariable long transactionId) {

		Transaction transactionById = itransactionServiceImpl.findTransactionById(transactionId);
		return new ResponseEntity<>(transactionById, HttpStatus.OK);

	}

	@GetMapping("/all/{account_id}") // method to find all transaction by account_id
	public Set<Transaction> displayAllTransactionByAccountId(@PathVariable long account_id) {
		return itransactionServiceImpl.getAllMyAccTransactions(account_id);

	}

	@PostMapping("/filterdate") // method to find all transaction by account_id between date

	public Set<Transaction> displayAllTransactionBetweenDate(@RequestBody TransactionGetPayload payload) {

		return itransactionServiceImpl.listAllTransactions(payload.getAccountId(), payload.getFromDate(),
				payload.getToDate());

	}
}