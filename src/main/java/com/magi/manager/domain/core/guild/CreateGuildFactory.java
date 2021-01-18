package com.magi.manager.domain.core.guild;

public class CreateGuildFactory {

    public Guild execute(String name, String iconHash, DiscordServer discordServer) {
        return new Guild(name, iconHash, discordServer);
    }
    
}
