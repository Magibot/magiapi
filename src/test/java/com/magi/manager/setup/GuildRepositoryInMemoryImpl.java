package com.magi.manager.setup;

import java.util.ArrayList;
import java.util.List;

import com.magi.manager.domain.application.guild.GuildRepository;
import com.magi.manager.domain.application.guild.dto.GuildDto;

public class GuildRepositoryInMemoryImpl implements GuildRepository {

    private List<GuildDto> guilds = new ArrayList<>();

    @Override
    public void save(GuildDto guildDto) {
        guilds.add(guildDto);
    }
    
}
