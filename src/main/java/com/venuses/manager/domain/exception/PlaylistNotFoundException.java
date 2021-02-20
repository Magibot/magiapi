package com.venuses.manager.domain.exception;

public class PlaylistNotFoundException extends Exception {

    private static final long serialVersionUID = -1784135550988099421L;

    public PlaylistNotFoundException() {
    }

    public PlaylistNotFoundException(String message) {
        super(message);
    }

    public PlaylistNotFoundException(Throwable cause) {
        super(cause);
    }

    public PlaylistNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlaylistNotFoundException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
    
}
