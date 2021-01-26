package com.venuses.manager.infrastructure.outbound.mongo.member;

import com.venuses.manager.domain.application.member.dto.MemberDto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "member")
public class MemberDocument {

    @Id
    private final String id;

    private final String idFromDiscord;
    private final String username;
    private final Boolean isAdministrator;
    private final String creationDate;

    public MemberDocument(String id, String idFromDiscord, String username, Boolean isAdministrator, String creationDate) {
        this.id = id;
        this.idFromDiscord = idFromDiscord;
        this.username = username;
        this.isAdministrator = isAdministrator;
        this.creationDate = creationDate;
    }

    public static MemberDocument of(MemberDto memberDto) {
        return new MemberDocument(
            memberDto.getId(),
            memberDto.getIdFromDiscord(),
            memberDto.getUsername(),
            memberDto.getIsAdministrator(),
            memberDto.getCreationDate()
        );
    }

    public MemberDto toDto() {
        return new MemberDto(
            id,
            idFromDiscord,
            username,
            isAdministrator,
            creationDate
        );
    }
    
}
