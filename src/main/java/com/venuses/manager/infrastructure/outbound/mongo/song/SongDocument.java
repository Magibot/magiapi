package com.venuses.manager.infrastructure.outbound.mongo.song;

import com.venuses.manager.domain.application.song.dto.SongDto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "song")
public class SongDocument {

    @Id
    private final String id;

    private final String name;
    private final String artist;
    private final String addedBy;
    private final String youtubeLink;
    private final String creationDate;

    public SongDocument(String id, String name, String artist, String addedBy, String youtubeLink, String creationDate) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.addedBy = addedBy;
        this.youtubeLink = youtubeLink;
        this.creationDate = creationDate;
    }

    public static SongDocument of(SongDto songDto) {
        return new SongDocument(
            songDto.getId(),
            songDto.getName(),
            songDto.getArtist(),
            songDto.getAddedBy(),
            songDto.getYoutubeLink(),
            songDto.getCreationDate()
        );
    }

    public SongDto toDto() {
        return new SongDto(
            id,
            name,
            artist,
            addedBy,
            youtubeLink,
            creationDate
        );
    }
    
}
