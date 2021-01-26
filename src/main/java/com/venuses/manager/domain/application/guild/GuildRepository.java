package com.venuses.manager.domain.application.guild;

import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.GuildNotFoundException;

public interface GuildRepository {
    
    void save(GuildDto guildDto);

    void addPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException;

    GuildDto findById(String guildId) throws GuildNotFoundException;

    void addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException;

}
