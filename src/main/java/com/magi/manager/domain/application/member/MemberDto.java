package com.magi.manager.domain.application.member;

import com.magi.manager.domain.core.member.Member;

public class MemberDto {

    protected String id;
    protected String idFromDiscord;
    protected String name;
    protected String creationDate;

    public MemberDto() {

    }

    public MemberDto(String idFromDiscord, String name) {
        this.idFromDiscord = idFromDiscord;
        this.name = name;
    }

    public MemberDto(String idFromDiscord, String name, String creationDate) {
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.creationDate = creationDate;
    }

    public MemberDto(String id, String idFromDiscord, String name, String creationDate) {
        this.id = id;
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.creationDate = creationDate;
    }

    public static MemberDto from(Member member) {
        return new MemberDto(
            member.getId().toString(),
            member.getIdFromDiscord(),
            member.getName(),
            member.getCreationDate().toString()
        );
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdFromDiscord() {
        return idFromDiscord;
    }

    public void setIdFromDiscord(String idFromDiscord) {
        this.idFromDiscord = idFromDiscord;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
    
}
