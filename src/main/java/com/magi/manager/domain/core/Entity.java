package com.magi.manager.domain.core;

import java.util.Objects;

public class Entity {
    
    private final Identifier id;
    private final ApplicationDate creationDate;

    public Entity() {
        this.id = new Identifier();
        this.creationDate = new ApplicationDate();
    }

    public Entity(Identifier id, ApplicationDate creationDate) {
        this.id = id;
        this.creationDate = creationDate;
    }

    protected Entity(String id, String creationDate) {
        this.id = Identifier.of(id);
        this.creationDate = ApplicationDate.of(creationDate);
    }

    public Identifier getId() {
        return id;
    }

    public ApplicationDate getCreationDate() {
        return creationDate;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((creationDate == null) ? 0 : creationDate.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Entity)) {
            return false;
        }
        Entity other = (Entity) o;
        return Objects.equals(id, other.id);
    }

}
