package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.core.guild.DiscordServer;
import com.magi.manager.domain.core.guild.Guild;

import org.springframework.stereotype.Service;

@Service
public class GuildApplicationServiceImpl implements GuildApplicationService {

    private DiscordServer tDiscordServer(DiscordServerDto discordServerDto) {
        return new DiscordServer(
            discordServerDto.getIdFromDiscord(),
            discordServerDto.getRegion(),
            discordServerDto.getOwner());
    }

    private Guild toGuild(GuildDto guildDto) {
        DiscordServer discordServer = this.tDiscordServer(guildDto.getDiscordServer());
        return new Guild(
            guildDto.getName(), 
            guildDto.getIconHash(), 
            discordServer);
    }

    @Override
    public GuildDto createGuild(GuildDto guildDto) {
        Guild guild = toGuild(guildDto);
        return GuildDto.from(guild);        
    }
    
}
