package com.magi.manager.domain.application.guild;

import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.member.MemberDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;
import com.magi.manager.domain.exception.GuildNotFoundException;

public interface GuildApplicationService {
    
    GuildDto createGuild(GuildDto guildDto);

    PlaylistDto createPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException;

    GuildDto getGuild(String id) throws GuildNotFoundException;

    MemberDto addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException;

}
