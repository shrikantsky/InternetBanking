package com.cg.iba.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Customer;
import com.cg.iba.entities.Gender;
import com.cg.iba.entities.Role;
import com.cg.iba.entities.SavingsAccount;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.ICustomerRepository;
import com.cg.iba.repository.ISavingsAccountRepository;

@SpringBootTest
 class CustomerServiceTest {

	@InjectMocks
	ICustomerServiceImpl icustomerserviceimpl = new ICustomerServiceImpl();

	@Mock
	ICustomerRepository icustomerrepositiory;
	
	
	@Mock
	ISavingsAccountRepository isavingsaccountrepository;
	
	//create
	@Test
	void testSaveCustomer() {
		Customer customer = new Customer();
		customer.setUserId(1);
		customer.setPassword("abc");
		customer.setRole(Role.CUSTOMER);
		customer.setCustomerName("shrikant");
		customer.setEmailId("82shrik@gmail.com");
		customer.setPhoneNo("79098755");
		customer.setAge(21);
		customer.setGender(Gender.MALE);
		

		when(icustomerrepositiory.save(customer)).thenReturn(customer);
		Customer customer1 =icustomerserviceimpl.addCustomer(customer);
		assertEquals(customer,customer1);

	}
	
	
	
	//update
	@Test
	void updateCustomer()  {
		Customer customer = new Customer();
		customer.setUserId(1);
		customer.setPassword("abc");
		customer.setRole(Role.CUSTOMER);
		customer.setCustomerName("shrikant");
		customer.setEmailId("82shrik@gmail.com");
		customer.setPhoneNo("79098755");
		customer.setAge(21);
		customer.setGender(Gender.MALE);
		

		
		Optional<Customer> optionalCustomer= Optional.of(customer);
		Customer customer1 = new Customer();
		customer1.setUserId(1);
		customer1.setPassword("abc");
		customer1.setRole(Role.CUSTOMER);
		customer1.setCustomerName("shrikant yadav");
		customer1.setEmailId("82shrik@gmail.com");
		customer1.setPhoneNo("87878787");
		customer1.setAge(21);
		customer1.setGender(Gender.MALE);

		when( icustomerrepositiory.findById((long) 1)).thenReturn(optionalCustomer);
		when( icustomerrepositiory.save(customer1)).thenReturn(customer1);
		Customer customer2=icustomerserviceimpl.updateCustomer(customer1);
		assertEquals(customer1,customer2);
		
	}
	
	
	
	
	
	//find by
	@Test
  void findCustomerById() throws DetailsNotFoundException {
		Customer customer = new Customer();
		customer.setUserId(1);
		customer.setPassword("abc");
		customer.setRole(Role.CUSTOMER);
		customer.setCustomerName("shrikant");
		customer.setEmailId("82shrik@gmail.com");
		customer.setPhoneNo("79098755");
		customer.setAge(21);
		customer.setGender(Gender.MALE);

		Optional<Customer> optionalcustomer = Optional.of(customer);

		when(icustomerrepositiory.findById((long) 1)).thenReturn(optionalcustomer);

		Customer customer1 = icustomerserviceimpl.findCustomerById(1);

		assertEquals("shrikant", customer1.getCustomerName());

	}
	
	
	
	
	
	
	
	@Test
	 void  listAllCustomers() {
		
		//customer1
		Customer customer = new Customer();
		customer.setUserId(1);
		customer.setPassword("abc");
		customer.setRole(Role.CUSTOMER);
		customer.setCustomerName("shrikant");
		customer.setEmailId("82shrik@gmail.com");
		customer.setPhoneNo("79098755");
		customer.setAge(21);
		customer.setGender(Gender.MALE);
	
		Account account=new Account();
		account.setAccountId(1);
		account.setCustomer(customer);
		
		SavingsAccount savingaccount=new SavingsAccount();
		savingaccount.setAccountId(1);
		savingaccount.setBalance(1000);
		savingaccount.setMinBalance(500);

		
		//customer2
		Customer customer1 = new Customer();
		customer1.setUserId(2);
		customer1.setPassword("abc");
		customer1.setRole(Role.CUSTOMER);
		customer1.setCustomerName("shrikant");
		customer1.setEmailId("82shrik@gmail.com");
		customer1.setPhoneNo("79098755");
		customer1.setAge(21);
		customer1.setGender(Gender.MALE);
		
		Account account1=new Account();
		account.setAccountId(2);
		account.setCustomer(customer1);
		
		SavingsAccount saving=new SavingsAccount();
		saving.setAccountId(2);
		saving.setBalance(10000);
		saving.setMinBalance(9);
		

		Set<Customer> cust=icustomerserviceimpl.listAllCustomers(1000);
		assertEquals(0,cust.size());
		
	}
	
	
	
	
	
	
	
//delete
	@Test
 void deleteCustomer() {

		Customer customer = new Customer();
		customer.setUserId(1);
		customer.setPassword("abc");
		customer.setRole(Role.CUSTOMER);
		customer.setCustomerName("shrikant");
		customer.setEmailId("82shrik@gmail.com");
		customer.setPhoneNo("79098755");
		customer.setAge(21);
		customer.setGender(Gender.MALE);

		Optional<Customer> optionalcustomer= Optional.of(customer);
		when(icustomerrepositiory.findById((long) 1)).thenReturn(optionalcustomer);

		doNothing().when(icustomerrepositiory).deleteById((long) 1);

		icustomerserviceimpl.deleteCustomer(1);

		verify(icustomerrepositiory, times(1)).findById((long) 1);
		verify(icustomerrepositiory, times(1)).deleteById((long) 1);

	}
	
	
	
	//Exception
		@Test
	    void DetailsNotFoundException() {

	        when(icustomerrepositiory.findById((long) 1)).thenThrow(DetailsNotFoundException.class);

	        assertThrows(DetailsNotFoundException.class,()->icustomerserviceimpl.findCustomerById(1));
	    }
		
		
		@Test
	     void EmptyListException() {

	        when(icustomerrepositiory.findById((long) 1)).thenThrow(EmptyListException.class);

	        assertThrows(EmptyListException.class,()->icustomerserviceimpl.findCustomerById(1));
	    }
		
		
		@Test
	     void InvalidDetailsException() {

	        when(icustomerrepositiory.findById((long) 1)).thenThrow(InvalidDetailsException.class);

	        assertThrows(InvalidDetailsException.class,()->icustomerserviceimpl.findCustomerById(1));
	    }
		
		
	
	

}
