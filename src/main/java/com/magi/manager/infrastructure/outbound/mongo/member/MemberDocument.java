package com.magi.manager.infrastructure.outbound.mongo.member;

import com.magi.manager.domain.application.member.MemberDto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "member")
public class MemberDocument {

    @Id
    private final String id;

    private final String idFromDiscord;
    private final String name;
    private final String creationDate;

    public MemberDocument(String id, String idFromDiscord, String name, String creationDate) {
        this.id = id;
        this.idFromDiscord = idFromDiscord;
        this.name = name;
        this.creationDate = creationDate;
    }

    public static MemberDocument of(MemberDto memberDto) {
        return new MemberDocument(
            memberDto.getId(),
            memberDto.getIdFromDiscord(),
            memberDto.getName(),
            memberDto.getCreationDate()
        );
    }

    public MemberDto toDto() {
        return new MemberDto(
            id,
            idFromDiscord,
            name,
            creationDate
        );
    }
    
}
