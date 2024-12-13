package com.cg.iba.model;

public class TransactionRequest {
	
	private	long accountId;
	private	double amount;
	private	long receiverAccountId;
	
	public long getReceiverAccountId() {
		return receiverAccountId;
	}
	public void setReceiverAccountId(long receiverAccountId) {
		this.receiverAccountId = receiverAccountId;
	}
	public long getAccountId() {
		return accountId;
	}
	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}

}
