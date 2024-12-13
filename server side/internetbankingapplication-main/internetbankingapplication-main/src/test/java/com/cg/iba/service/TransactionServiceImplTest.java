package com.cg.iba.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import com.cg.iba.entities.Account;
import com.cg.iba.exception.EmptyListException;

import com.cg.iba.entities.Transaction;
import com.cg.iba.entities.TransactionStatus;
import com.cg.iba.entities.TransactionType;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.ITransactionRepository;

@SpringBootTest
class TransactionServiceImplTest {

	@InjectMocks
	ITransactionServiceImpl itransactionServiceImpl = new ITransactionServiceImpl();

	@InjectMocks
	AccountServiceImpl iaccountServiceImpl = new AccountServiceImpl();

	@Mock
	ITransactionRepository itransactionRepositoryImpl;

	@Mock
	IAccountRepository iAccountRepositoryImpl;

	// testcase of finding transaction by id
	@Test
	void testfindTransactionById() {
		Account account = new Account();
		account.setAccountId(1001);
		account.setBalance(300);

		Transaction transaction = new Transaction();
		transaction.setTransactionId(101);
		transaction.setAmount(8000);
		transaction.setDateTime(LocalDateTime.of(2022, 9, 15, 0, 0));
		transaction.setTransactionRemarks("sucs");
		transaction.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction.setTransactionType(TransactionType.DEBIT);
		transaction.setAccount(account);

		Optional<Transaction> optinalTransaction = Optional.of(transaction);

		when(itransactionRepositoryImpl.findById((long) 101)).thenReturn(optinalTransaction);
		Transaction transactionobj = itransactionServiceImpl.findTransactionById(101);
		assertEquals(8000, transactionobj.getAmount());
	}

	// exception of finding transaction by id
	@Test
	void testDetailsNotFoundException() {

		when(itransactionRepositoryImpl.findById((long) 102)).thenThrow(DetailsNotFoundException.class);
		assertThrows(DetailsNotFoundException.class, () -> itransactionServiceImpl.findTransactionById(102));

	}

	// testcase for finding all transaction of account
	@Test
	void testgetAllMyAccTransactions() {

		Transaction transaction = new Transaction();
		transaction.setTransactionId(101);
		transaction.setAmount(8000);
		transaction.setDateTime(LocalDateTime.of(2022, 9, 15, 0, 0));
		transaction.setTransactionRemarks("sucs");
		transaction.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction.setTransactionType(TransactionType.DEBIT);
		transaction.setAccount(null);

		Transaction transaction1 = new Transaction();
		transaction1.setTransactionId(102);
		transaction1.setAmount(8000);
		transaction1.setDateTime(LocalDateTime.of(2022, 9, 15, 0, 0));
		transaction1.setTransactionRemarks("sucs");
		transaction1.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction1.setTransactionType(TransactionType.DEBIT);
		transaction1.setAccount(null);

		Set<Transaction> transactions = new HashSet<>();
		transactions.add(transaction1);
		transactions.add(transaction);

		Account account = new Account();
		account.setAccountId(1001);
		account.setBalance(300);
		account.setTransactions(transactions);

		Optional<Account> optinalaccount = Optional.of(account);

		when(iAccountRepositoryImpl.findById((long) 1001)).thenReturn(optinalaccount);

		Set<Transaction> tran = itransactionServiceImpl.getAllMyAccTransactions(1001);

		assertEquals(2, tran.size());

	}

	@Test // exception
	void testInvalidAccountException() {

		when(iAccountRepositoryImpl.findById((long) 1002)).thenThrow(InvalidAccountException.class);
		assertThrows(InvalidAccountException.class, () -> itransactionServiceImpl.getAllMyAccTransactions(1002));

	}

	@Test // exception
	void testEmptyListEException() {

		when(iAccountRepositoryImpl.findById((long) 1002).isEmpty()).thenThrow(EmptyListException.class);
		assertThrows(EmptyListException.class, () -> itransactionServiceImpl.getAllMyAccTransactions(1002));

	}

	@Test
	void testgetlistAllTransactionsBetweenDates() {

		Transaction transaction = new Transaction();
		transaction.setTransactionId(101);
		transaction.setAmount(8000);
		transaction.setDateTime(LocalDateTime.of(2022, 9, 15, 0, 0));
		transaction.setTransactionRemarks("sucs");
		transaction.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction.setTransactionType(TransactionType.DEBIT);
		transaction.setAccount(null);

		Transaction transaction1 = new Transaction();
		transaction1.setTransactionId(102);
		transaction1.setAmount(8000);
		transaction1.setDateTime(LocalDateTime.of(2022, 9, 17, 0, 0));
		transaction1.setTransactionRemarks("sucs");
		transaction1.setTransactionStatus(TransactionStatus.SUCCESSFUL);
		transaction1.setTransactionType(TransactionType.DEBIT);
		transaction1.setAccount(null);

		Set<Transaction> transactions = new HashSet<>();
		transactions.add(transaction1);
		transactions.add(transaction);
		Account account = new Account();
		account.setAccountId(1001);
		account.setBalance(300);
		account.setTransactions(transactions);

		Optional<Account> optinalaccount = Optional.of(account);

		when(iAccountRepositoryImpl.findById((long) 1001)).thenReturn(optinalaccount);

		Set<Transaction> tran = itransactionServiceImpl.listAllTransactions(1001, LocalDate.of(2022, 9, 10),
				LocalDate.of(2022, 9, 17));

		assertEquals(2, tran.size());
	}

}
