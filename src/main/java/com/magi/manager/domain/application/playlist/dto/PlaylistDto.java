package com.magi.manager.domain.application.playlist.dto;

import com.magi.manager.domain.core.playlist.Playlist;

public class PlaylistDto {

    protected String id;
    protected String name;
    protected String guildId;
    protected String creator;
    protected String creationDate;

    public PlaylistDto() {
        
    }

    public PlaylistDto(String name, String guildId, String creator) {
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
    }

    public PlaylistDto(String name, String guildId, String creator, String creationDate) {
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.creationDate = creationDate;
    }

    public PlaylistDto(String id, String name, String guildId, String creator, String creationDate) {
        this.id = id;
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.creationDate = creationDate;
    }

    public static PlaylistDto from(Playlist playlist) {
        return new PlaylistDto(
            playlist.getId().toString(),
            playlist.getName(),
            playlist.getGuildId().toString(),
            playlist.getCreator(),
            playlist.getCreationDate().toString());    
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

    public String getGuildId() {
        return guildId;
    }

    public void setGuildId(String guildId) {
        this.guildId = guildId;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

}
