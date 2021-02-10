package com.venuses.manager.domain.core.playlist;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.core.Entity;
import com.venuses.manager.domain.core.Identifier;
import com.venuses.manager.domain.core.song.Song;

public class Playlist extends Entity {

    private final String name;
    private final Identifier guildId;
    private final String creator;
    private final List<Song> songs;

    public Playlist(String name, Identifier guildId, String creator) {
        super();
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
        this.songs = new ArrayList<>();
    }

    public Playlist(String id, String name, String guildId, String creator, List<Song> songs, String creationDate) {
        super(id, creationDate);
        this.name = name;
        this.guildId = Identifier.of(guildId);
        this.creator = creator;
        this.songs = songs;
    }

    public String getName() {
        return name;
    }

    public Identifier getGuildId() {
        return guildId;
    }

    public String getCreator() {
        return creator;
    }

    public List<Song> getSongs() {
        return songs;
    }
    
}
