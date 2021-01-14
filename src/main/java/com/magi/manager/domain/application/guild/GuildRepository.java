package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.GuildDto;

public interface GuildRepository {
    
    void save(GuildDto guildDto);

}
