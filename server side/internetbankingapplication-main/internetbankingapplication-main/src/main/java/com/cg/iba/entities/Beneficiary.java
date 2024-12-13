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
@Table(name="beneficiary_tbl")
public class Beneficiary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="beneficiary_id")
	private long  beneficiaryId;
	
	@NotNull(message="Beneficiary Name is required")
	@Column(name="beneficiary_name")
	private String beneficiaryName;
	
	@Column(name="beneficiary_acc_no")
	private long  beneficiaryAccNo;
	
	@Column(name="ifsc")
	private String IFSC;
	
	@Column(name="account_type")
	private AccountType accountType;
	
	@ManyToOne
	@JoinColumn(name="account_id")
	private Account account;

	
	
	public long getBeneficiaryId() {
		return beneficiaryId;
	}

	public void setBeneficiaryId(long beneficiaryId) {
		this.beneficiaryId = beneficiaryId;
	}

	public String getBeneficiaryName() {
		return beneficiaryName;
	}

	public void setBeneficiaryName(String beneficiaryName) {
		this.beneficiaryName = beneficiaryName;
	}

	public long getBeneficiaryAccNo() {
		return beneficiaryAccNo;
	}
	
	
	

	public void setBeneficiaryAccNo(long beneficiaryAccNo) {
		this.beneficiaryAccNo = beneficiaryAccNo;
	}

	public String getIFSC() {
		return IFSC;
	}

	public void setIFSC(String iFSC) {
		IFSC = iFSC;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	
	
	
	
}
