package com.venuses.manager.domain.core.song;

import com.venuses.manager.domain.core.DiscordIdentifier;
import com.venuses.manager.domain.core.Entity;

public class Song extends Entity {
    
    private final String name;
    private final String artist;
    private final DiscordIdentifier addedBy;
    private final String youtubeLink;

    public Song(String name, String artist, String addedBy, String youtubeLink) {
        super();
        this.name = name;
        this.artist = artist;
        this.addedBy = new DiscordIdentifier(addedBy);
        this.youtubeLink = youtubeLink;
    }

    public Song(String id, String name, String artist, String addedBy, String youtubeLink, String creationDate) {
        super(id, creationDate);
        this.name = name;
        this.artist = artist;
        this.addedBy = new DiscordIdentifier(addedBy);
        this.youtubeLink = youtubeLink;
    }

    public String getName() {
        return name;
    }

    public String getArtist() {
        return artist;
    }

    public DiscordIdentifier getAddedBy() {
        return addedBy;
    }

    public String getYoutubeLink() {
        return youtubeLink;
    }

}
