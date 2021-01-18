package com.magi.manager.infrastructure.outbound.mongo.guild;

import java.util.ArrayList;
import java.util.List;

import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;
import com.magi.manager.infrastructure.outbound.mongo.playlist.PlaylistDocument;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "guild")
public class GuildDocument extends GuildDto {

    @Id
    private final String id;

    private final List<PlaylistDocument> playlists;

    public GuildDocument(String id, String name, String iconHash, DiscordServerDto discordServer, List<PlaylistDto> playlists, String creationDate) {
        super(name, iconHash, discordServer, creationDate);
        this.id = id;
        this.playlists = new ArrayList<>();
        playlists.forEach(playlistDto -> this.playlists.add(PlaylistDocument.of(playlistDto)));
    }

    public static GuildDocument of(GuildDto guildDto) {
        return new GuildDocument(
            guildDto.getId(),
            guildDto.getName(),
            guildDto.getIconHash(),
            guildDto.getDiscordServer(),
            guildDto.getPlaylists(),
            guildDto.getCreationDate());
    }

    public GuildDto toDto() {
        List<PlaylistDto> playlistDtos = new ArrayList<>();
        playlists.forEach(playlist -> playlistDtos.add(playlist.toDto()));
        return new GuildDto(
            id,
            name,
            iconHash,
            discordServer,
            playlistDtos,
            creationDate
        );
    }

    public void addPlaylist(PlaylistDocument playlistDocument) {
        playlists.add(playlistDocument);
    }
    
}
