package com.magi.manager.domain.core.member;

import com.magi.manager.domain.core.Entity;

public class Member extends Entity {

    private final String idFromDiscord;
    private final String name;

    public Member(String idFromDiscord, String name) {
        super();
        this.idFromDiscord = idFromDiscord;
        this.name = name;
    }

    public Member(String id, String idFromDiscord, String name, String creationDate) {
        super(id, creationDate);
        this.idFromDiscord = idFromDiscord;
        this.name = name;
    }

    public String getIdFromDiscord() {
        return idFromDiscord;
    }

    public String getName() {
        return name;
    }
    
}
