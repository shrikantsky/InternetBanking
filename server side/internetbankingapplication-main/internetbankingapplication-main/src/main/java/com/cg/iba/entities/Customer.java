package com.cg.iba.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "customer_tbl")
public class Customer extends User {
	
	@NotNull(message="FirstName is Required")
	@Column(name = "customer_name")
	private String customerName;
	
	@Size(min=5,max=15)
	@Column(name = "phone_no")
	private String phoneNo;

	@Column(name = "email_id")
	private String emailId;

	@Column(name = "age")
	private int age;

	@Column(name = "gender")
	private Gender gender;

	@JsonIgnore
	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
	
	private Set<Account> account;

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Set<Account> getAccount() {
		return account;
	}

	public void setAccount(Set<Account> account) {
		this.account = account;
	}

}
