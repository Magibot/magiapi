package com.magi.manager.domain.application.guild.dto;

import java.util.ArrayList;
import java.util.List;

import com.magi.manager.domain.application.playlist.dto.PlaylistDto;
import com.magi.manager.domain.core.guild.Guild;

public class GuildDto {
    
    protected String id;
    protected String name;
    protected String iconHash;
    protected DiscordServerDto discordServer;
    protected List<PlaylistDto> playlists;
    protected String creationDate;

    public GuildDto() {

    }

    public GuildDto(String name, String iconHash, DiscordServerDto discordServer) {
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
    }

    public GuildDto(String name, String iconHash, DiscordServerDto discordServer, String creationDate) {
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
        this.creationDate = creationDate;
    }

    public GuildDto(String id, String name, String iconHash, DiscordServerDto discordServer, List<PlaylistDto> playlists, String creationDate) {
        this.id = id;
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
        this.playlists = playlists;
        this.creationDate = creationDate;
    }

    public static GuildDto from(Guild guild) {
        List<PlaylistDto> playlistDtos = new ArrayList<>();
        guild.getPlaylists().forEach(playlist -> playlistDtos.add(PlaylistDto.from(playlist)));
        DiscordServerDto discordServerDto = DiscordServerDto.from(guild.getDiscordServer());
        return new GuildDto(
            guild.getId().toString(), 
            guild.getName(), 
            guild.getIconHash(), 
            discordServerDto,
            playlistDtos,
            guild.getCreationDate().toString());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIconHash() {
        return iconHash;
    }

    public void setIconHash(String iconHash) {
        this.iconHash = iconHash;
    }

    public DiscordServerDto getDiscordServer() {
        return discordServer;
    }

    public void setDiscordServer(DiscordServerDto discordServer) {
        this.discordServer = discordServer;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public List<PlaylistDto> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<PlaylistDto> playlists) {
        this.playlists = playlists;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

}
