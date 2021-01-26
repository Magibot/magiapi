package com.venuses.manager.domain.application.guild;

import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.GuildNotFoundException;

public interface GuildApplicationService {
    
    GuildDto createGuild(GuildDto guildDto);

    PlaylistDto createPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException;

    GuildDto getGuild(String id) throws GuildNotFoundException;

    MemberDto addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException;

}
