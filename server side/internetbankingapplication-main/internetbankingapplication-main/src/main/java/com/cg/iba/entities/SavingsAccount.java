package com.cg.iba.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="savings_account_tbl")
public class SavingsAccount extends Account {

	@Column(name="min_balance")
    private double minBalance;
	
	@Column(name="fine")
    private double fine;
	
	

	public double getMinBalance() {
		return minBalance;
	}

	public void setMinBalance(double minBalance) {
		this.minBalance = minBalance;
	}

	public double getFine() {
		return fine;
	}

	public void setFine(double fine) {
		this.fine = fine;
	} 

}
