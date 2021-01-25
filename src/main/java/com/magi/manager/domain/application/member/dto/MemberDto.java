package com.magi.manager.domain.application.member.dto;

import com.magi.manager.domain.core.member.Member;

public class MemberDto {

    protected String id;
    protected String idFromDiscord;
    protected String name;
    protected Boolean isAdministrator;
    protected String creationDate;

    public MemberDto() {

    }

    public MemberDto(String idFromDiscord, String name, Boolean isAdministrator) {
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.isAdministrator = isAdministrator;
    }

    public MemberDto(String idFromDiscord, String name, Boolean isAdministrator, String creationDate) {
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.isAdministrator = isAdministrator;
        this.creationDate = creationDate;
    }

    public MemberDto(String id, String idFromDiscord, String name, Boolean isAdministrator, String creationDate) {
        this.id = id;
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.isAdministrator = isAdministrator;
        this.creationDate = creationDate;
    }

    public static MemberDto from(Member member) {
        return new MemberDto(
            member.getId().toString(),
            member.getIdFromDiscord(),
            member.getName(),
            member.getIsAdministrator(),
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

    public Boolean getIsAdministrator() {
        return isAdministrator;
    }

    public void setIsAdministrator(Boolean isAdministrator) {
        this.isAdministrator = isAdministrator;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

}
