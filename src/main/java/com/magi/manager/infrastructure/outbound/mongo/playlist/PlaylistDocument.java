package com.magi.manager.infrastructure.outbound.mongo.playlist;

import com.magi.manager.domain.application.playlist.dto.PlaylistDto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "playlist")
public class PlaylistDocument {

    @Id
    private final String id;

    private final String name;
    private final String guildId;
    private final String creator;
    private final String creationDate;

    public PlaylistDocument(String id, String name, String guildId, String creator, String creationDate) {
        this.id = id;
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.creationDate = creationDate;
    }

    public static PlaylistDocument of(PlaylistDto playlistDto) {
        return new PlaylistDocument(
            playlistDto.getId(),
            playlistDto.getName(),
            playlistDto.getGuildId(),
            playlistDto.getCreator(),
            playlistDto.getCreationDate()
        );
    }

    public PlaylistDto toDto() {
        return new PlaylistDto(
            id,
            name,
            guildId,
            creator,
            creationDate
        );
    }
    
}
