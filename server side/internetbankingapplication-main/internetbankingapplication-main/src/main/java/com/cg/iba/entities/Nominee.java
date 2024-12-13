package com.cg.iba.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="nominee_tbl")
public class Nominee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="nominee_id")
    private long nomineeId;
	
	@NotNull(message="Name is required")
	@Column(name="name")
    private String name;
	
	@Column(name="govt_id")
    private String govtId; 
	
	@Column(name="govt_id_type")
    private String govtIdType; 
	
	@Column(name="phone_no")
    private String phoneNo;
	
	@Column(name="relation")
    private Relation relation;

	@ManyToOne
	@JoinColumn(name="account_id")
	private Account account;
	
	
	
	
	public long getNomineeId() {
		return nomineeId;
	}

	public void setNomineeId(long nomineeId) {
		this.nomineeId = nomineeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGovtId() {
		return govtId;
	}

	public void setGovtId(String govtId) {
		this.govtId = govtId;
	}

	public String getGovtIdType() {
		return govtIdType;
	}

	public void setGovtIdType(String govtIdType) {
		this.govtIdType = govtIdType;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Relation getRelation() {
		return relation;
	}

	public void setRelation(Relation relation) {
		this.relation = relation;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}


	
	
 }
