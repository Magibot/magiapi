package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;

public interface GuildRepository {
    
    void save(GuildDto guildDto);

    void addPlaylist(String guildId, PlaylistDto playlistDto);

    GuildDto findById(String guildId);

}
