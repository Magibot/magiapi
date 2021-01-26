package com.venuses.manager.domain.core.guild;

import org.springframework.stereotype.Service;

@Service
public class CreateGuildFactory {

    public Guild execute(String name, String iconHash, DiscordServer discordServer) {
        return new Guild(name, iconHash, discordServer);
    }
    
}
