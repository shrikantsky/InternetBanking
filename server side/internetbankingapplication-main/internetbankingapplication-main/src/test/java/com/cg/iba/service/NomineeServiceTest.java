package com.cg.iba.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.cg.iba.entities.Nominee;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.INomineeRepository;

@SpringBootTest
class NomineeServiceTest {

	@InjectMocks
	NomineeServiceImpl inomineeservice = new NomineeServiceImpl();

	@Mock
	INomineeRepository nomineeRepository;

	@Test
	void findNomineeById() {
		Nominee nominee = new Nominee();
		nominee.setAccount(null);
		nominee.setGovtId("164");
		nominee.setGovtIdType("pancard");
		nominee.setName("Neha");
		nominee.setNomineeId(1);
		nominee.setPhoneNo("76543345");
		nominee.setRelation(null);

		Optional<Nominee> optionalnominee = Optional.of(nominee);

		when(nomineeRepository.findById((long) 1)).thenReturn(optionalnominee);

		Nominee nominee1 = inomineeservice.findNomineeById(1);

		assertEquals("Neha", nominee1.getName());

	}

	@Test
	void deleteCustomer() {

		Nominee nominee = new Nominee();
		nominee.setAccount(null);
		nominee.setGovtId("164");
		nominee.setGovtIdType("pancard");
		nominee.setName("neha");
		nominee.setNomineeId(1);
		nominee.setPhoneNo("76543345");
		nominee.setRelation(null);

		Optional<Nominee> optionalProduct = Optional.of(nominee);
		when(nomineeRepository.findById((long) 1)).thenReturn(optionalProduct);

		doNothing().when(nomineeRepository).deleteById((long) 1);

		inomineeservice.deleteNominee(1);

		verify(nomineeRepository, times(1)).findById((long) 1);
		verify(nomineeRepository, times(1)).deleteById((long) 1);

	}

	@Test
	void updateNominee() {

		Nominee nominee = new Nominee();
		nominee.setAccount(null);
		nominee.setGovtId("164");
		nominee.setGovtIdType("pancard");
		nominee.setName("neha");
		nominee.setNomineeId(1);
		nominee.setPhoneNo("76543345");
		nominee.setRelation(null);

		Optional<Nominee> optionalNominee = Optional.of(nominee);

		Nominee nominee1 = new Nominee();
		nominee1.setAccount(null);
		nominee1.setGovtId("164");
		nominee1.setGovtIdType("pancard");
		nominee1.setName("nehachand");
		nominee1.setNomineeId(1);
		nominee1.setPhoneNo("76543345");
		nominee1.setRelation(null);

		when(nomineeRepository.findById((long) 1)).thenReturn(optionalNominee);
		when(nomineeRepository.save(nominee1)).thenReturn(nominee1);
		Nominee nominee2 = inomineeservice.updateNominee(nominee1);
		assertEquals(nominee1, nominee2);

	}

	@Test
	void testSaveNominee() {
		Nominee nominee = new Nominee();
		nominee.setAccount(null);
		nominee.setGovtId("164");
		nominee.setGovtIdType("pancard");
		nominee.setName("nehachand");
		nominee.setNomineeId(1);
		nominee.setPhoneNo("76543345");
		nominee.setRelation(null);
		when(nomineeRepository.save(nominee)).thenReturn(nominee);
		Nominee nominee1 = inomineeservice.addNominee(nominee);
		assertEquals(nominee, nominee1);

	}

	@Test
	void listAllNominee() {
		Nominee nominee = new Nominee();
		nominee.setAccount(null);
		nominee.setGovtId("164");
		nominee.setGovtIdType("pancard");
		nominee.setName("nehachand");
		nominee.setNomineeId(1);
		nominee.setPhoneNo("76543345");
		nominee.setRelation(null);

		Optional<Nominee> optionalnominee = Optional.of(nominee);

		when(nomineeRepository.findById((long) 1)).thenReturn(optionalnominee);
		Nominee nominee4 = inomineeservice.findNomineeById(1);
		assertEquals("nehachand", nominee4.getName());

	}

// Exception 
	@Test
	void DetailsNotFoundException() {

		when(nomineeRepository.findById((long) 1)).thenThrow(DetailsNotFoundException.class);

		assertThrows(DetailsNotFoundException.class, () -> inomineeservice.findNomineeById(1));
	}

	@Test
	void InvalidAccountException() {

		when(nomineeRepository.findById((long) 1)).thenThrow(InvalidAccountException.class);

		assertThrows(InvalidAccountException.class, () -> inomineeservice.findNomineeById(1));
	}

	@Test
	void EmptyListException() {

		when(nomineeRepository.findById((long) 1)).thenThrow(EmptyListException.class);

		assertThrows(EmptyListException.class, () -> inomineeservice.findNomineeById(1));
	}

	@Test
	void InvalidDetailsException() {

		when(nomineeRepository.findById((long) 1)).thenThrow(InvalidDetailsException.class);

		assertThrows(InvalidDetailsException.class, () -> inomineeservice.findNomineeById(1));
	}

}