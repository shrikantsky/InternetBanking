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
import com.cg.iba.entities.Nominee;
import com.cg.iba.service.INomineeService;



@RestController
@RequestMapping("/nominee")
@CrossOrigin(origins = "http://localhost:3000")
public class NomineeController {



   @Autowired
    private INomineeService nomineeservice;



   @PostMapping("/add")
    public ResponseEntity<Nominee> addNominee(@Valid @RequestBody Nominee nominee) {
        Nominee nom = nomineeservice.addNominee(nominee);
       return new ResponseEntity<>(nom, HttpStatus.CREATED);
        



   }



   @PutMapping("/update")
    public ResponseEntity<Nominee> updateNominee(@Valid @RequestBody Nominee nominee) {
        Nominee nom = nomineeservice.updateNominee(nominee);
        return new ResponseEntity<>(nom, HttpStatus.CREATED);



       
    }



   @DeleteMapping("/delete/{nomineeId}")
    public ResponseEntity<Object> deletenominee(@PathVariable("nomineeId") long nomineeId) {



       nomineeservice.deleteNominee(nomineeId);
        return new ResponseEntity<>("Deleted Sucessfully ", HttpStatus.OK);
        
    }



   @GetMapping("/find/{nomineeId}")
    public ResponseEntity<Object> findNomineeById(@PathVariable("nomineeId") long nomineeId) {
        Nominee nom = nomineeservice.findNomineeById(nomineeId);
        return new ResponseEntity<>(nom, HttpStatus.CREATED);
        
    }



   @GetMapping("/all/{accountid}")
    public ResponseEntity<Object> listAllNominees(@PathVariable long accountid) {
	   
	  



       Set<Nominee> nominee = nomineeservice.listAllNominees(accountid);
       return new ResponseEntity<>(nominee, HttpStatus.CREATED);


   }



}