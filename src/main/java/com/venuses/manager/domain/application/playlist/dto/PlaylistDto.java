package com.venuses.manager.domain.application.playlist.dto;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.domain.core.playlist.Playlist;

public class PlaylistDto {

    protected String id;
    protected String name;
    protected String guildId;
    protected String creator;
    protected Boolean open;
    protected List<SongDto> songs;
    protected String creationDate;

    public PlaylistDto() {
        
    }

    public PlaylistDto(String name, String creator, Boolean open, List<SongDto> songs) {
        this.name = name;
        this.creator = creator;
        this.open = open;
        this.songs = songs;
    }

    public PlaylistDto(String name, String guildId, String creator, Boolean open, List<SongDto> songs, String creationDate) {
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.open = open;
        this.songs = songs;
        this.creationDate = creationDate;
    }

    public PlaylistDto(String id, String name, String guildId, String creator, Boolean open, List<SongDto> songs, String creationDate) {
        this.id = id;
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.open = open;
        this.songs = songs;
        this.creationDate = creationDate;
    }

    public static PlaylistDto from(Playlist playlist) {
        List<SongDto> songDtos = new ArrayList<>();
        playlist.getSongs().forEach(song -> songDtos.add(SongDto.from(song)));
        return new PlaylistDto(
            playlist.getId().toString(),
            playlist.getName(),
            playlist.getGuildId().toString(),
            playlist.getCreator(),
            playlist.isOpen(),
            songDtos,
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

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public List<SongDto> getSongs() {
        return songs;
    }

    public void setSongs(List<SongDto> songs) {
        this.songs = songs;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }    

}
