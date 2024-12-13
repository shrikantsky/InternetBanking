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

import com.cg.iba.entities.Beneficiary;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.IBeneficiaryRepository;

@SpringBootTest
class BeneficiaryServiceTest {

	@InjectMocks
	BeneficiaryServiceImpl beneficiaryservice = new BeneficiaryServiceImpl();

	@Mock
	IBeneficiaryRepository beneficiaryRepositiory;

	@Test
	void testSaveBeneficiary() {

		Beneficiary beneficiary = new Beneficiary();

		beneficiary.setBeneficiaryAccNo(3);
		beneficiary.setBeneficiaryId(104);
		beneficiary.setBeneficiaryName("SHRI");
		beneficiary.setIFSC("MHAB000012");

		when(beneficiaryRepositiory.save(beneficiary)).thenReturn(beneficiary);
		Beneficiary beneficiary1 = beneficiaryservice.addBeneficiary(beneficiary);
		assertEquals(beneficiary, beneficiary1);

	}

	@Test
	void updateNominee() {

		Beneficiary beneficiary = new Beneficiary();
		beneficiary.setBeneficiaryAccNo(1);
		beneficiary.setBeneficiaryId(1);
		beneficiary.setBeneficiaryName("SHRI");
		beneficiary.setIFSC("MHAB000012");

		Optional<Beneficiary> optionalbeneficiary = Optional.of(beneficiary);

		Beneficiary beneficiary1 = new Beneficiary();
		beneficiary1.setBeneficiaryAccNo(1);
		beneficiary1.setBeneficiaryId(1);
		beneficiary1.setBeneficiaryName("SHRIKANT");
		beneficiary1.setIFSC("MHAB000012");

		when(beneficiaryRepositiory.findById((long) 1)).thenReturn(optionalbeneficiary);
		when(beneficiaryRepositiory.save(beneficiary1)).thenReturn(beneficiary1);
		Beneficiary beneficiary2 = beneficiaryservice.updateBeneficiary(beneficiary1);
		assertEquals(beneficiary1, beneficiary2);

	}

	@Test
	void findBeneficiaryById() throws DetailsNotFoundException {
		Beneficiary beneficiary = new Beneficiary();

		beneficiary.setBeneficiaryAccNo(1);
		beneficiary.setBeneficiaryId(101);
		beneficiary.setBeneficiaryName("SWAPNALI");
		beneficiary.setIFSC("MHAB000012");

		Optional<Beneficiary> optionalbeneficiary = Optional.of(beneficiary);

		when(beneficiaryRepositiory.findById((long) 1)).thenReturn(optionalbeneficiary);
		Beneficiary beneficiary1 = beneficiaryservice.findBeneficiaryById(1);
		assertEquals("SWAPNALI", beneficiary1.getBeneficiaryName());

	}

	@Test
	void listAllBeneficiaries() {

		Beneficiary beneficiary = new Beneficiary();

		beneficiary.setBeneficiaryAccNo(3);
		beneficiary.setBeneficiaryId(104);
		beneficiary.setBeneficiaryName("SHRI");
		beneficiary.setIFSC("MHAB000012");

		Optional<Beneficiary> optionalbeneficiary = Optional.of(beneficiary);

		when(beneficiaryRepositiory.findById((long) 1)).thenReturn(optionalbeneficiary);
		Beneficiary beneficiary4 = beneficiaryservice.findBeneficiaryById(1);
		assertEquals("SHRI", beneficiary4.getBeneficiaryName());

	}

	@Test
	void deleteBeneficiary() {

		Beneficiary beneficiary = new Beneficiary();

		beneficiary.setBeneficiaryAccNo(1);
		beneficiary.setBeneficiaryId(101);
		beneficiary.setBeneficiaryName("SWAPNALI");
		beneficiary.setIFSC("MHAB000012");

		Optional<Beneficiary> optionalProduct = Optional.of(beneficiary);
		when(beneficiaryRepositiory.findById((long) 1)).thenReturn(optionalProduct);

		doNothing().when(beneficiaryRepositiory).deleteById((long) 1);

		beneficiaryservice.deleteBeneficiary(1);

		verify(beneficiaryRepositiory, times(1)).findById((long) 1);
		verify(beneficiaryRepositiory, times(1)).deleteById((long) 1);

	}

//Exception
	@Test
	void DetailsNotFoundException() {

		when(beneficiaryRepositiory.findById((long) 1)).thenThrow(DetailsNotFoundException.class);

		assertThrows(DetailsNotFoundException.class, () -> beneficiaryservice.findBeneficiaryById(1));

	}

	@Test
	void EmptyListException() {

		when(beneficiaryRepositiory.findById((long) 1)).thenThrow(EmptyListException.class);

		assertThrows(EmptyListException.class, () -> beneficiaryservice.findBeneficiaryById(1));

	}

	@Test
	void InvalidAccountException() {

		when(beneficiaryRepositiory.findById((long) 1)).thenThrow(InvalidAccountException.class);

		assertThrows(InvalidAccountException.class, () -> beneficiaryservice.findBeneficiaryById(1));

	}

	@Test
	void InvalidDetailsException() {

		when(beneficiaryRepositiory.findById((long) 1)).thenThrow(InvalidDetailsException.class);

		assertThrows(InvalidDetailsException.class, () -> beneficiaryservice.findBeneficiaryById(1));

	}

}