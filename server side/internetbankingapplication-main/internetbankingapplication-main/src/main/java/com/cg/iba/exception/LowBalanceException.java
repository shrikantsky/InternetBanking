package com.cg.iba.exception;

public class LowBalanceException extends RuntimeException {
	public LowBalanceException(String msg){
		super(msg);
	}
}
