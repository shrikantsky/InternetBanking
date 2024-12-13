package com.cg.iba.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Customer;
import com.cg.iba.entities.SavingsAccount;
import com.cg.iba.entities.TermAccount;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.ICustomerRepository;
import com.cg.iba.repository.ISavingsAccountRepository;
import com.cg.iba.repository.ITermAccountRepository;

@SpringBootTest
class AccountServiceTest {

	@InjectMocks
	AccountServiceImpl accountService = new AccountServiceImpl();

	@Mock
	IAccountRepository accountRepository;

	@Mock
	ISavingsAccountRepository savingsAccountRepository;

	@Mock
	ITermAccountRepository termAccountRepository;

	@InjectMocks
	ICustomerServiceImpl customerService = new ICustomerServiceImpl();

	@Mock
	ICustomerRepository customerRepository;

	/*
	 * @Test public void testInvalidAccountException() {
	 * 
	 * when(accountRepository.findById((long)
	 * 1020)).thenThrow(InvalidAccountException.class);
	 * 
	 * assertThrows(InvalidAccountException.class, () ->
	 * accountService.findAccountById(1020)); }
	 */

	@Test
	void transferMoneyTest() {
		Account acc1 = new Account();
		acc1.setAccountId(1);
		acc1.setBalance(20000);
		acc1.setBeneficiaries(null);
		acc1.setCustomer(null);
		acc1.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc1.setInterestRate(5);
		acc1.setNominees(null);
		acc1.setTransactions(null);

		Account acc2 = new Account();
		acc2.setAccountId(2);
		acc2.setBalance(10000);
		acc2.setBeneficiaries(null);
		acc2.setCustomer(null);
		acc2.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc2.setInterestRate(5);
		acc2.setNominees(null);
		acc2.setTransactions(null);

		Optional<Account> optionalAcc1 = Optional.of(acc1);
		when(accountRepository.findById((long) 1)).thenReturn(optionalAcc1);

		Optional<Account> optionalAcc2 = Optional.of(acc2);
		when(accountRepository.findById((long) 2)).thenReturn(optionalAcc2);

		accountService.transferMoney(1, 2, 1000);

		Account sender = accountService.findAccountById(1);

		Account receiver = accountService.findAccountById(2);

		assertEquals(19000, sender.getBalance());
		assertEquals(11000, receiver.getBalance());
	}

	@Test
	void withdrawTest() {
		Account acc1 = new Account();
		acc1.setAccountId(1);
		acc1.setBalance(20000);
		acc1.setBeneficiaries(null);
		acc1.setCustomer(null);
		acc1.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc1.setInterestRate(5);
		acc1.setNominees(null);
		acc1.setTransactions(null);

		Optional<Account> optionalAcc = Optional.of(acc1);
		when(accountRepository.findById((long) 1)).thenReturn(optionalAcc);

		accountService.withdraw(1, 1000);

		Account account = accountService.findAccountById(1);

		assertEquals(19000, account.getBalance());
	}

	@Test
	void depositTest() {
		Account acc1 = new Account();
		acc1.setAccountId(1);
		acc1.setBalance(20000);
		acc1.setBeneficiaries(null);
		acc1.setCustomer(null);
		acc1.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc1.setInterestRate(5);
		acc1.setNominees(null);
		acc1.setTransactions(null);

		Optional<Account> optionalAcc = Optional.of(acc1);
		when(accountRepository.findById((long) 1)).thenReturn(optionalAcc);

		accountService.deposit(1, 1000);

		Account account = accountService.findAccountById(1);

		assertEquals(21000, account.getBalance());
	}

	@Test
	void addSavingsAccount() {
		SavingsAccount savAcc = new SavingsAccount();
		savAcc.setAccountId(1001);
		savAcc.setBalance(10000);
		savAcc.setBeneficiaries(null);
		savAcc.setCustomer(null);
		savAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		savAcc.setFine(100);
		savAcc.setInterestRate(5);
		savAcc.setMinBalance(500);
		savAcc.setNominees(null);
		savAcc.setTransactions(null);

		when(accountRepository.save(savAcc)).thenReturn(savAcc);

		SavingsAccount acc = accountService.addSavingsAccount(savAcc);

		assertEquals(savAcc, acc);
	}

	@Test
	void addTermAccount() {
		TermAccount termAcc = new TermAccount();
		termAcc.setAccountId(1001);
		termAcc.setBalance(10000);
		termAcc.setBeneficiaries(null);
		termAcc.setCustomer(null);
		termAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		termAcc.setInterestRate(5);
		termAcc.setMonths(12);
		termAcc.setNominees(null);
		termAcc.setPenaltyAmount(1000);
		termAcc.setTransactions(null);

		when(accountRepository.save(termAcc)).thenReturn(termAcc);

		TermAccount acc = accountService.addTermAccount(termAcc);

		assertEquals(termAcc, acc);
	}

	@Test
	void updateSavingsAccount() {
		SavingsAccount savAcc = new SavingsAccount();
		savAcc.setAccountId(1001);
		savAcc.setBalance(10000);
		savAcc.setBeneficiaries(null);
		savAcc.setCustomer(null);
		savAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		savAcc.setFine(100);
		savAcc.setInterestRate(5);
		savAcc.setMinBalance(500);
		savAcc.setNominees(null);
		savAcc.setTransactions(null);

		Optional<Account> optSavAcc = Optional.of(savAcc);

		SavingsAccount updatedSavAcc = new SavingsAccount();
		updatedSavAcc.setAccountId(1001);
		updatedSavAcc.setBalance(21000);
		updatedSavAcc.setBeneficiaries(null);
		updatedSavAcc.setCustomer(null);
		updatedSavAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		updatedSavAcc.setFine(100);
		updatedSavAcc.setInterestRate(5);
		updatedSavAcc.setMinBalance(500);
		updatedSavAcc.setNominees(null);
		updatedSavAcc.setTransactions(null);

		when(accountRepository.findById((long) 1001)).thenReturn(optSavAcc);
		when(accountRepository.save(updatedSavAcc)).thenReturn(updatedSavAcc);
		SavingsAccount acc = accountService.updateSavingsAccount(updatedSavAcc);

		assertEquals(updatedSavAcc, acc);
	}

	@Test
	void updateTermAccount() {
		TermAccount termAcc = new TermAccount();
		termAcc.setAccountId(1001);
		termAcc.setBalance(10000);
		termAcc.setBeneficiaries(null);
		termAcc.setCustomer(null);
		termAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		termAcc.setInterestRate(5);
		termAcc.setMonths(12);
		termAcc.setNominees(null);
		termAcc.setPenaltyAmount(1000);
		termAcc.setTransactions(null);

		Optional<Account> optionalTermAcc = Optional.of(termAcc);

		TermAccount updatedTermAcc = new TermAccount();
		updatedTermAcc.setAccountId(1001);
		updatedTermAcc.setBalance(10000);
		updatedTermAcc.setBeneficiaries(null);
		updatedTermAcc.setCustomer(null);
		updatedTermAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		updatedTermAcc.setInterestRate(5);
		updatedTermAcc.setMonths(12);
		updatedTermAcc.setNominees(null);
		updatedTermAcc.setPenaltyAmount(1000);
		updatedTermAcc.setTransactions(null);

		when(accountRepository.findById((long) 1001)).thenReturn(optionalTermAcc);
		when(accountRepository.save(updatedTermAcc)).thenReturn(updatedTermAcc);
		TermAccount acc = accountService.updateTermAccount(updatedTermAcc);

		assertEquals(updatedTermAcc, acc);
	}

	@Test
	void closeSavingsAccountTest() {
		SavingsAccount savAcc = new SavingsAccount();
		savAcc.setAccountId(1001);
		savAcc.setBalance(10000);
		savAcc.setBeneficiaries(null);
		savAcc.setCustomer(null);
		savAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		savAcc.setFine(100);
		savAcc.setInterestRate(5);
		savAcc.setMinBalance(500);
		savAcc.setNominees(null);
		savAcc.setTransactions(null);

		Optional<Account> optionalSavAcc = Optional.of(savAcc);

		when(accountRepository.findById((long) 1001)).thenReturn(optionalSavAcc);

		doNothing().when(accountRepository).deleteById((long) 1001);

		accountService.closeSavingsAccount(1001);

		verify(accountRepository, times(1)).findById((long) 1001);
		verify(accountRepository, times(1)).deleteById((long) 1001);
	}

	@Test
	void closeTermAccountTest() throws InvalidAccountException {
		TermAccount termAcc = new TermAccount();
		termAcc.setAccountId(1001);
		termAcc.setBalance(10000);
		termAcc.setBeneficiaries(null);
		termAcc.setCustomer(null);
		termAcc.setDateOfOpening(LocalDate.of(2020, 10, 10));
		termAcc.setInterestRate(5);
		termAcc.setMonths(12);
		termAcc.setNominees(null);
		termAcc.setPenaltyAmount(1000);
		termAcc.setTransactions(null);

		Optional<Account> optionalTermAcc = Optional.of(termAcc);

		when(accountRepository.findById((long) 1001)).thenReturn(optionalTermAcc);

		doNothing().when(accountRepository).deleteById((long) 1001);

		accountService.closeTermAccount(1001);

		verify(accountRepository, times(1)).findById((long) 1001);
		verify(accountRepository, times(1)).deleteById((long) 1001);
	}

	@Test
	void findAccountByIdTest() {
		Account acc1 = new Account();
		acc1.setAccountId(1);
		acc1.setBalance(20000);
		acc1.setBeneficiaries(null);
		acc1.setCustomer(null);
		acc1.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc1.setInterestRate(5);
		acc1.setNominees(null);
		acc1.setTransactions(null);

		Optional<Account> optionalAcc = Optional.of(acc1);
		when(accountRepository.findById((long) 1)).thenReturn(optionalAcc);

		Account account = accountService.findAccountById(1);

		assertEquals(1, account.getAccountId());
	}

	@Test
	void viewAccounts() {
		Account acc1 = new Account();
		acc1.setAccountId(1);
		acc1.setBalance(20000);
		acc1.setBeneficiaries(null);
		acc1.setCustomer(null);
		acc1.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc1.setInterestRate(5);
		acc1.setNominees(null);
		acc1.setTransactions(null);

		Account acc2 = new Account();
		acc2.setAccountId(2);
		acc2.setBalance(10000);
		acc2.setBeneficiaries(null);
		acc2.setCustomer(null);
		acc2.setDateOfOpening(LocalDate.of(2020, 10, 10));
		acc2.setInterestRate(5);
		acc2.setNominees(null);
		acc2.setTransactions(null);

		Set<Account> account = new HashSet<>();
		account.add(acc1);
		account.add(acc2);

		Customer customer = new Customer();
		customer.setAccount(account);
		customer.setAge(20);
		customer.setCustomerName("tanmay");
		customer.setEmailId(null);
		customer.setGender(null);
		customer.setPassword(null);
		customer.setPhoneNo(null);
		customer.setRole(null);
		customer.setUserId(1);

		Optional<Customer> optCust = Optional.of(customer);
		when(customerRepository.findById((long) 1)).thenReturn(optCust);

		Set<Account> a = accountService.viewAccounts(1);

		assertEquals(2, a.size());
	}

}
