package com.magi.manager.domain.core;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class ApplicationDate implements Serializable {

    private static final long serialVersionUID = -5736431059634161890L;

    private final LocalDateTime value;

    public ApplicationDate() {
        this.value = LocalDateTime.now();
    }
    
    public ApplicationDate(LocalDateTime value) {
        this.value = value;
    }

    public static ApplicationDate of(String value) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime datetime = LocalDateTime.parse(value, formatter);
        return new ApplicationDate(datetime);
    }

    @Override
    public String toString() {
        return value.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ApplicationDate)) {
            return false;
        }
        ApplicationDate date = (ApplicationDate) o;
        return Objects.equals(value, date.value);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }

}
