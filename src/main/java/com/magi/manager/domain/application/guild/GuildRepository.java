package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;
import com.magi.manager.domain.exception.GuildNotFoundException;

public interface GuildRepository {
    
    void save(GuildDto guildDto);

    void addPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException;

    GuildDto findById(String guildId) throws GuildNotFoundException;

}
