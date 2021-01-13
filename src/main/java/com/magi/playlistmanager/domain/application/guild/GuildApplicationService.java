package com.magi.playlistmanager.domain.application.guild;

import com.magi.playlistmanager.domain.application.guild.dto.GuildDto;

public interface GuildApplicationService {
    
    GuildDto createGuild(GuildDto guildDto);

}
