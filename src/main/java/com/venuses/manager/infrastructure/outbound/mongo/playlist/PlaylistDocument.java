package com.venuses.manager.infrastructure.outbound.mongo.playlist;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.infrastructure.outbound.mongo.song.SongDocument;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "playlist")
public class PlaylistDocument {

    @Id
    private final String id;

    private final String name;
    private final String guildId;
    private final String creator;
    private final List<SongDocument> songs;
    private final String creationDate;

    public PlaylistDocument(String id, String name, String guildId, String creator, List<SongDocument> songs, String creationDate) {
        this.id = id;
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.songs = songs;
        this.creationDate = creationDate;
    }

    public static PlaylistDocument of(PlaylistDto playlistDto) {
        List<SongDocument> songDocuments = new ArrayList<>();
        playlistDto.getSongs().forEach(songDto -> songDocuments.add(SongDocument.of(songDto)));
        return new PlaylistDocument(
            playlistDto.getId(),
            playlistDto.getName(),
            playlistDto.getGuildId(),
            playlistDto.getCreator(),
            songDocuments,
            playlistDto.getCreationDate()
        );
    }

    public PlaylistDto toDto() {
        List<SongDto> songDtos = new ArrayList<>();
        songs.forEach(songDocument -> songDtos.add(songDocument.toDto()));
        return new PlaylistDto(
            id,
            name,
            guildId,
            creator,
            songDtos,
            creationDate
        );
    }
    
}
