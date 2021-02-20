package com.venuses.manager.domain.application.guild;

import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberDuplicatedException;
import com.venuses.manager.domain.exception.MemberNotFoundException;
import com.venuses.manager.domain.exception.PlaylistNotOpenException;

public interface GuildApplicationService {
    
    GuildDto createGuild(GuildDto guildDto);

    PlaylistDto createPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException, MemberNotFoundException;

    GuildDto getGuild(String id) throws GuildNotFoundException;

    MemberDto addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException, MemberDuplicatedException;

    PlaylistDto addSongToPlaylist(String playlistId, SongDto songDto) throws PlaylistNotOpenException;

}
