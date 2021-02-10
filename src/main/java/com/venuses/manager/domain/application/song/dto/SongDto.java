package com.venuses.manager.domain.application.song.dto;

import com.venuses.manager.domain.core.song.Song;

public class SongDto {

    protected String id;
    protected String name;
    protected String artist;
    protected String addedBy;
    protected String youtubeLink;
    protected String creationDate;

    public SongDto() {
        
    }

    public SongDto(String name, String artist, String addedBy, String youtubeLink) {
        this.name = name;
        this.artist = artist;
        this.addedBy = addedBy;
        this.youtubeLink = youtubeLink;
    }

    public SongDto(String name, String artist, String addedBy, String youtubeLink, String creationDate) {
        this.name = name;
        this.artist = artist;
        this.addedBy = addedBy;
        this.youtubeLink = youtubeLink;
        this.creationDate = creationDate;
    }

    public SongDto(String id, String name, String artist, String addedBy, String youtubeLink, String creationDate) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.addedBy = addedBy;
        this.youtubeLink = youtubeLink;
        this.creationDate = creationDate;
    }

    public static SongDto from(Song song) {
        return new SongDto(
            song.getId().toString(),
            song.getName(),
            song.getArtist(),
            song.getAddedBy(),
            song.getYoutubeLink(),
            song.getCreationDate().toString());
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

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(String addedBy) {
        this.addedBy = addedBy;
    }

    public String getYoutubeLink() {
        return youtubeLink;
    }

    public void setYoutubeLink(String youtubeLink) {
        this.youtubeLink = youtubeLink;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
    
}
