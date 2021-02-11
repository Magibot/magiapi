package com.venuses.manager.domain.exception;

public class SongDuplicatedException extends Exception {

    private static final long serialVersionUID = -1402793382580723940L;

    public SongDuplicatedException() {
    }

    public SongDuplicatedException(String message) {
        super(message);
    }

    public SongDuplicatedException(Throwable cause) {
        super(cause);
    }

    public SongDuplicatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public SongDuplicatedException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
