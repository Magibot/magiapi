package com.venuses.manager.domain.exception;

public class MemberNotFoundException extends Exception {

    private static final long serialVersionUID = 5013897336680136949L;

    private final String memberId;

    public MemberNotFoundException(String memberId) {
        super("Member " + memberId + " was not found.");
        this.memberId = memberId;
    }

    public String getMemberId() {
        return memberId;
    }
    
}
