package com.magi.playlistmanager.domain.core.guild;

import com.magi.playlistmanager.domain.core.Entity;

public class Guild extends Entity {
    
    private final String name;
    private final String iconHash;
    private final DiscordServer discordServer;

    public Guild(String name, String iconHash, DiscordServer discordServer) {
        super();
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
    }

    public String getName() {
        return name;
    }

    public String getIconHash() {
        return iconHash;
    }

    public DiscordServer getDiscordServer() {
        return discordServer;
    }

}
