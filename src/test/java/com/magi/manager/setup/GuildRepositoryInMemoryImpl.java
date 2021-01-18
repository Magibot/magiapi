package com.magi.manager.setup;

import java.util.ArrayList;
import java.util.List;

import com.magi.manager.domain.application.guild.GuildRepository;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;

public class GuildRepositoryInMemoryImpl implements GuildRepository {

    private List<GuildDto> guilds = new ArrayList<>();

    @Override
    public void save(GuildDto guildDto) {
        guilds.add(guildDto);
    }

    @Override
    public void addPlaylist(String guildId, PlaylistDto playlistDto) {
        // TODO Auto-generated method stub

    }

    @Override
    public GuildDto findById(String guildId) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
