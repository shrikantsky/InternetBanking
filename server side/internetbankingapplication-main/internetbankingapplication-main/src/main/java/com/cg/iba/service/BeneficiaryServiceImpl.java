package com.cg.iba.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.iba.entities.Account;
import com.cg.iba.entities.Beneficiary;
import com.cg.iba.exception.DetailsNotFoundException;
import com.cg.iba.exception.EmptyListException;
import com.cg.iba.exception.InvalidAccountException;
import com.cg.iba.exception.InvalidDetailsException;
import com.cg.iba.repository.IAccountRepository;
import com.cg.iba.repository.IBeneficiaryRepository;



@Service
public class BeneficiaryServiceImpl implements IBeneficiaryService {
    
  @Autowired
    private IBeneficiaryRepository beneficiaryRepository;
  @Autowired
   private IAccountRepository accountRepository;
    @Override
    public Beneficiary addBeneficiary(Beneficiary beneficiary) throws InvalidDetailsException {
        
        return beneficiaryRepository.save(beneficiary);
        
        
    }



   @Override
    public Beneficiary updateBeneficiary(Beneficiary beneficiary) throws InvalidDetailsException {
        
        Optional<Beneficiary>optBen= beneficiaryRepository.findById(beneficiary.getBeneficiaryId());
        
        if(optBen.isEmpty()) {
            
            throw new  InvalidDetailsException("Benificary not found"+beneficiary.getBeneficiaryId());
        }
        return beneficiaryRepository.save(beneficiary);
        
        
    }



   @Override
    public boolean deleteBeneficiary(long beneficiaryId) throws DetailsNotFoundException {
        
        Optional<Beneficiary>optBen= beneficiaryRepository.findById(beneficiaryId);
        
        if(optBen.isEmpty()) {
            
            throw new  DetailsNotFoundException ("Benificary not found"+beneficiaryId);
        }
        beneficiaryRepository.deleteById(beneficiaryId);
        
        return false;
    }



   @Override
    public Beneficiary findBeneficiaryById(long beneficiaryId) throws DetailsNotFoundException {
        
        Optional<Beneficiary>optBen=beneficiaryRepository.findById(beneficiaryId);
        
        if(optBen.isEmpty()) {
            
            throw new  DetailsNotFoundException(" Benificary not found Exception"+beneficiaryId);
        }
        return optBen.get();
        
        
        
    }



   @Override
    public Set<Beneficiary> listAllBeneficiaries(long accountid) throws InvalidAccountException, EmptyListException {
        
        Optional<Account>acc=accountRepository.findById(accountid);
        
        if(acc.isEmpty()) {
            
            throw new EmptyListException ("List not found"+accountid);
        }
        
        Account account   = acc.get();    
        
        return account.getBeneficiaries();
        
    }



}