package com.venuses.manager.domain.core;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Objects;

public class ApplicationDate implements Serializable {

    private static final long serialVersionUID = -5736431059634161890L;

    private final ZonedDateTime value;

    public ApplicationDate() {
        this.value = LocalDateTime.now().atZone(ZoneOffset.UTC);;
    }
    
    public ApplicationDate(ZonedDateTime value) {
        this.value = value;
    }

    public static ApplicationDate of(String value) {
        return new ApplicationDate(ZonedDateTime.parse(value));
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
