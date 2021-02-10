package com.venuses.manager.domain.exception;

public class MemberDuplicatedException extends Exception {

    private static final long serialVersionUID = 4663213910381809363L;

    public MemberDuplicatedException() {
    }

    public MemberDuplicatedException(String message) {
        super(message);
    }

    public MemberDuplicatedException(Throwable cause) {
        super(cause);
    }

    public MemberDuplicatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public MemberDuplicatedException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
    
}
