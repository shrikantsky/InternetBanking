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

import com.cg.iba.entities.Beneficiary;
import com.cg.iba.service.IBeneficiaryService;



@RestController
@RequestMapping("/beneficiary")
@CrossOrigin(origins = "http://localhost:3000")
public class BeneficiaryController {
    
    @Autowired
     private IBeneficiaryService beneficiaryservice ;
    
    @PostMapping("/add")
     public ResponseEntity<Object>addBeneficiary( @Valid @RequestBody Beneficiary beneficiary){
         Beneficiary Ben =  beneficiaryservice.addBeneficiary(beneficiary);
         return new ResponseEntity<>(Ben,HttpStatus.CREATED);
         
     }
    
      @PutMapping("/update")
    public ResponseEntity<Object>updateBeneficiary(@Valid @RequestBody Beneficiary beneficiary) {
          Beneficiary Ben = beneficiaryservice.updateBeneficiary(beneficiary);
          return new ResponseEntity<>(Ben,HttpStatus.CREATED);
            
         
      }
      
      @DeleteMapping("/delete/{beneficiaryId}")
      public  ResponseEntity<Object> deleteBeneficiary( @PathVariable ("beneficiaryId")long beneficiaryId) {
          
          beneficiaryservice.deleteBeneficiary(beneficiaryId);
          return new ResponseEntity<>("Deleted Sucessfully ", HttpStatus.OK);
             
          
      }
      
      @GetMapping("/find/{beneficiaryId}")
      public ResponseEntity<Object> findBeneficiaryById(@PathVariable("beneficiaryId")long beneficiaryId) {
          
        Beneficiary Ben =  beneficiaryservice.findBeneficiaryById(beneficiaryId);
        
          return new ResponseEntity<>(Ben, HttpStatus.CREATED);
             
      }
      
      @GetMapping("/all/{accountid}")
      public ResponseEntity<Object> listAllBeneficiaries(@PathVariable long accountid) {
        
          Set<Beneficiary>beneficiary=beneficiaryservice.listAllBeneficiaries(accountid);
         
          return new ResponseEntity<>(beneficiary, HttpStatus.CREATED);
          
      }
}