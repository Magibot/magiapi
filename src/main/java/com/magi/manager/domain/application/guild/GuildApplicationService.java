package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;

public interface GuildApplicationService {
    
    GuildDto createGuild(GuildDto guildDto);

    PlaylistDto createPlaylist(String guildId, PlaylistDto playlistDto);

}
