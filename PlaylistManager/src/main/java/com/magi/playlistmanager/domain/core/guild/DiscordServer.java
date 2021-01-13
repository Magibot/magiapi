package com.magi.playlistmanager.domain.core.guild;

public class DiscordServer {

    private final String idFromDiscord;
    private final String region;
    private final String owner;

    public DiscordServer(String idFromDiscord, String region, String owner) {
        this.idFromDiscord = idFromDiscord;
        this.region = region;
        this.owner = owner;
    }

    public String getIdFromDiscord() {
        return idFromDiscord;
    }

    public String getRegion() {
        return region;
    }

    public String getOwner() {
        return owner;
    }
    
}
