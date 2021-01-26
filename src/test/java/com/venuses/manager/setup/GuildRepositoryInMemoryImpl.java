package com.venuses.manager.setup;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.guild.GuildRepository;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.GuildNotFoundException;

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
    public GuildDto findById(String guildId) throws GuildNotFoundException {
        GuildDto guild = null;
        for (GuildDto g : guilds) {
            if (g.getId() == guildId) {
                guild = g;
            }
        }

        if (guild == null) {
            throw new GuildNotFoundException(guildId);
        }
        return guild;
    }

    @Override
    public void addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException {
        Boolean found = false;
        for (GuildDto g : guilds) {
            if (g.getId() == guildId) {
                found = true;
                List<MemberDto> members = g.getMembers();
                members.add(memberDto);
                g.setMembers(members);
            }
        }

        if (!found) {
            throw new GuildNotFoundException(guildId);
        }
    }
    
}
