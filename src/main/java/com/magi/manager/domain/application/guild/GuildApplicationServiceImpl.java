package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.core.guild.DiscordServer;
import com.magi.manager.domain.core.guild.Guild;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuildApplicationServiceImpl implements GuildApplicationService {

    private final GuildRepository guildRepository;

    @Autowired
    public GuildApplicationServiceImpl(final GuildRepository guildRepository) {
        this.guildRepository = guildRepository;
    }

    private DiscordServer toDiscordServer(DiscordServerDto discordServerDto) {
        return new DiscordServer(
            discordServerDto.getIdFromDiscord(),
            discordServerDto.getRegion(),
            discordServerDto.getOwner());
    }

    private Guild toGuild(GuildDto guildDto) {
        DiscordServer discordServer = this.toDiscordServer(guildDto.getDiscordServer());
        return new Guild(
            guildDto.getName(), 
            guildDto.getIconHash(), 
            discordServer);
    }

    @Override
    public GuildDto createGuild(GuildDto guildDto) {
        Guild guild = toGuild(guildDto);
        GuildDto guildCreated = GuildDto.from(guild);
        this.guildRepository.save(guildCreated);
        return guildCreated;
    }
    
}
