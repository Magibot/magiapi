package com.magi.manager.domain.core.member;

import com.magi.manager.domain.core.Entity;

public class Member extends Entity {

    private final String idFromDiscord;
    private final String name;
    private final Boolean isAdministrator;

    public Member(String idFromDiscord, String name, Boolean isAdministrator) {
        super();
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.isAdministrator = isAdministrator;
    }

    public Member(String id, String idFromDiscord, String name, Boolean isAdministrator, String creationDate) {
        super(id, creationDate);
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.isAdministrator = isAdministrator;
    }

    public String getIdFromDiscord() {
        return idFromDiscord;
    }

    public String getName() {
        return name;
    }

    public Boolean getIsAdministrator() {
        return isAdministrator;
    }
    
}
