package com.cg.iba.model;



import java.time.LocalDate;
import java.time.LocalDateTime;



public class TransactionGetPayload {
    
    private long accountId;
    private LocalDate fromDate;
    private LocalDate toDate;
    public long getAccountId() {
        return accountId;
    }
    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }
    public LocalDate getFromDate() {
        return fromDate;
    }
    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }
    public LocalDate getToDate() {
        return toDate;
    }
    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }
    



}