package com.venuses.manager.domain.application.member.dto;

import com.venuses.manager.domain.core.member.Member;

public class MemberDto {

    protected String id;
    protected String idFromDiscord;
    protected String username;
    protected Boolean isAdministrator;
    protected String creationDate;

    public MemberDto() {

    }

    public MemberDto(String idFromDiscord, String username, Boolean isAdministrator) {
        this.idFromDiscord = idFromDiscord;
        this.username = username;
        this.isAdministrator = isAdministrator;
    }

    public MemberDto(String idFromDiscord, String username, Boolean isAdministrator, String creationDate) {
        this.idFromDiscord = idFromDiscord;
        this.username = username;
        this.isAdministrator = isAdministrator;
        this.creationDate = creationDate;
    }

    public MemberDto(String id, String idFromDiscord, String username, Boolean isAdministrator, String creationDate) {
        this.id = id;
        this.idFromDiscord = idFromDiscord;
        this.username = username;
        this.isAdministrator = isAdministrator;
        this.creationDate = creationDate;
    }

    public static MemberDto from(Member member) {
        return new MemberDto(
            member.getId().toString(),
            member.getIdFromDiscord(),
            member.getUsername(),
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
