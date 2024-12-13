package com.cg.iba.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Nominee;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.INomineeRepository;

@Service
public class NomineeServiceImpl implements INomineeService {

	@Autowired
	private INomineeRepository nomineeRepository;

	@Autowired
	private IAccountRepository accountRepository;

	@Override
	public Nominee addNominee(Nominee nominee) throws InvalidDetailsException {
		return nomineeRepository.save(nominee);

	}

	@Override
	public Nominee updateNominee(Nominee nominee) throws InvalidDetailsException {
		Optional<Nominee> optNom = nomineeRepository.findById(nominee.getNomineeId());
		if (optNom.isEmpty()) {
			throw new InvalidDetailsException("Nominee not found" + nominee.getNomineeId());
		}

		return nomineeRepository.save(nominee);

	}

	@Override
	public boolean deleteNominee(long nomineeId) throws DetailsNotFoundException {
		Optional<Nominee> optNom = nomineeRepository.findById(nomineeId);
		if (optNom.isEmpty()) {
			throw new DetailsNotFoundException("Nominee not found" + nomineeId);
		}
		nomineeRepository.deleteById(nomineeId);
		return false;
	}

	@Override
	public Nominee findNomineeById(long nomineeId) throws DetailsNotFoundException {

		Optional<Nominee> optNom = nomineeRepository.findById(nomineeId);
		if (optNom.isEmpty()) {
			throw new DetailsNotFoundException("Nominee not found" + nomineeId);
		}
		return optNom.get();

	}

	@Override
	public Set<Nominee> listAllNominees(long accountid) throws InvalidAccountException, EmptyListException {

		Optional<Account> account = accountRepository.findById(accountid);
		if (account.isEmpty()) {
			throw new InvalidAccountException("list is empty");
		}

		Account acc = account.get();
		Set<Nominee> nominee = acc.getNominees();
		if (nominee.isEmpty()) {
			throw new EmptyListException("list is empty");
		}
		return nominee;
	}

}