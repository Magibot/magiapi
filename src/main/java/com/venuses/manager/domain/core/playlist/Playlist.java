package com.venuses.manager.domain.core.playlist;

import com.venuses.manager.domain.core.Entity;
import com.venuses.manager.domain.core.Identifier;

public class Playlist extends Entity {

    private final String name;
    private final Identifier guildId;
    private final String creator;

    public Playlist(String name, Identifier guildId, String creator) {
        super();
        this.name = name;
        this.guildId = guildId;
        this.creator = creator;
    }

    public Playlist(String id, String name, String guildId, String creator, String creationDate) {
        super(id, creationDate);
        this.name = name;
        this.guildId = Identifier.of(guildId);
        this.creator = creator;
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
    
}
