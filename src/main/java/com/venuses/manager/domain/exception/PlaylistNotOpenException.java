package com.venuses.manager.domain.exception;

public class PlaylistNotOpenException extends Exception {

    private static final long serialVersionUID = 3621993481069430930L;

    public PlaylistNotOpenException() {
    }

    public PlaylistNotOpenException(String message) {
        super(message);
    }

    public PlaylistNotOpenException(Throwable cause) {
        super(cause);
    }

    public PlaylistNotOpenException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlaylistNotOpenException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }    
    
}
