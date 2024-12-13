package com.cg.iba.entities;

public enum Role {

	ADMIN(1),
	CUSTOMER(2);

	private final int value;
    private Role(int value) {
        this.value = value;
    }
	
    public int getValue() {
        return value;
    }
}