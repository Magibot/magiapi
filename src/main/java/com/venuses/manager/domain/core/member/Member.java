package com.venuses.manager.domain.core.member;

import com.venuses.manager.domain.core.Entity;

public class Member extends Entity {

    private final String idFromDiscord;
    private final String username;
    private final Boolean isAdministrator;

    public Member(String idFromDiscord, String username, Boolean isAdministrator) {
        super();
        this.idFromDiscord = idFromDiscord;
        this.username = username;
        this.isAdministrator = isAdministrator;
    }

    public Member(String id, String idFromDiscord, String username, Boolean isAdministrator, String creationDate) {
        super(id, creationDate);
        this.idFromDiscord = idFromDiscord;
        this.username = username;
        this.isAdministrator = isAdministrator;
    }

    public String getIdFromDiscord() {
        return idFromDiscord;
    }

    public String getUsername() {
        return username;
    }

    public Boolean getIsAdministrator() {
        return isAdministrator;
    }
    
}
