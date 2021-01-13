package com.magi.playlistmanager.domain.application.guild.dto;

import com.magi.playlistmanager.domain.core.guild.DiscordServer;

public class DiscordServerDto {

    private String idFromDiscord;
    private String region;
    private String owner;

    public DiscordServerDto() {

    }

    public DiscordServerDto(String idFromDiscord, String region, String owner) {
        this.idFromDiscord = idFromDiscord;
        this.region = region;
        this.owner = owner;
    }

    public static DiscordServerDto from(DiscordServer discordServer) {
        return new DiscordServerDto(
            discordServer.getIdFromDiscord(), 
            discordServer.getRegion(),
            discordServer.getOwner());
    }

    public String getIdFromDiscord() {
        return idFromDiscord;
    }

    public void setIdFromDiscord(String idFromDiscord) {
        this.idFromDiscord = idFromDiscord;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
        
}
