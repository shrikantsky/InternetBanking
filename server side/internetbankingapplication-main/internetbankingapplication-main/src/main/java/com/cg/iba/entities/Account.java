package com.cg.iba.entities;


import java.time.LocalDate;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "account")
@Inheritance(
    strategy = InheritanceType.JOINED
)
public class Account {
	
	//@NotNull(message="Interest Rate is required")
	//@Size(min=10, max=20)
	//@Past(message="it cannot be future date")
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="account_id")
    private long accountId; 
	
	@NotNull(message="Interest Rate is required")
	@Column(name="interest_rate")
    private double interestRate;
	
	@Column(name="balance")
    private double balance;
	
	@Past(message="Date cannot be future date")
	@Column(name="date_of_opening")
    private LocalDate  dateOfOpening;
	
	@NotNull(message="Customer Id is required")
	@ManyToOne
	@JoinColumn(name="customer_id")
    private Customer customer;
	
	@JsonIgnore
	@OneToMany(mappedBy="account",cascade = CascadeType.ALL)
	private Set<Nominee> nominees;
	
	@JsonIgnore
	@OneToMany(mappedBy="account",cascade = CascadeType.ALL)
	private Set<Beneficiary> beneficiaries;
	
	@JsonIgnore
	@OneToMany(mappedBy="account",cascade = CascadeType.ALL)
	private Set<Transaction> transactions;

	
	
	public long getAccountId() {
		return accountId;
	}

	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}

	public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public LocalDate getDateOfOpening() {
		return dateOfOpening;
	}

	public void setDateOfOpening(LocalDate dateOfOpening) {
		this.dateOfOpening = dateOfOpening;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Set<Nominee> getNominees() {
		return nominees;
	}

	public void setNominees(Set<Nominee> nominees) {
		this.nominees = nominees;
	}

	public Set<Beneficiary> getBeneficiaries() {
		return beneficiaries;
	}

	public void setBeneficiaries(Set<Beneficiary> beneficiaries) {
		this.beneficiaries = beneficiaries;
	}

	public Set<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(Set<Transaction> transactions) {
		this.transactions = transactions;
	}
	
    
 }
