package com.venuses.manager.domain.core;

import java.io.Serializable;

public class DiscordIdentifier implements Serializable {

    private static final long serialVersionUID = 7308587457650098622L;

    private final String value;

    public DiscordIdentifier(String value) {
        this.value = value;
    }

    public static DiscordIdentifier of(String value) {
        return new DiscordIdentifier(value);
    }

    @Override
    public String toString() {
        return value;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((value == null) ? 0 : value.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        DiscordIdentifier other = (DiscordIdentifier) obj;
        if (value == null) {
            if (other.value != null)
                return false;
        } else if (!value.equals(other.value))
            return false;
        return true;
    }

}
