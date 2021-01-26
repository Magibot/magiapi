package com.venuses.manager.infrastructure.outbound.mongo.guild;

import java.util.Optional;

import com.venuses.manager.domain.application.guild.GuildRepository;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.infrastructure.outbound.mongo.member.MemberCollection;
import com.venuses.manager.infrastructure.outbound.mongo.member.MemberDocument;
import com.venuses.manager.infrastructure.outbound.mongo.playlist.PlaylistCollection;
import com.venuses.manager.infrastructure.outbound.mongo.playlist.PlaylistDocument;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class GuildRepositoryMongoImpl implements GuildRepository {

    @Autowired
    private GuildCollection guildCollection;

    @Autowired
    private PlaylistCollection playlistCollection;

    @Autowired
    private MemberCollection memberCollection;

    @Override
    public void save(GuildDto guildDto) {
        guildCollection.save(GuildDocument.of(guildDto));
    }

    @Override
    public void addPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException {
        Optional<GuildDocument> result = guildCollection.findById(guildId);
        if (result.isEmpty()) {
            throw new GuildNotFoundException(guildId);
        }

        PlaylistDocument playlistDocument = PlaylistDocument.of(playlistDto);
        playlistDocument = playlistCollection.save(playlistDocument);

        GuildDocument guildDocument = result.get();
        guildDocument.addPlaylist(playlistDocument);
        guildCollection.save(guildDocument);
    }

    @Override
    public GuildDto findById(String guildId) throws GuildNotFoundException {
        Optional<GuildDocument> result = guildCollection.findById(guildId);
        if (result.isEmpty()) {
            throw new GuildNotFoundException(guildId);
        }

        GuildDocument guildDocument = result.get();
        return guildDocument.toDto();
    }

    @Override
    public void addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException {
        Optional<GuildDocument> result = guildCollection.findById(guildId);
        if (result.isEmpty()) {
            throw new GuildNotFoundException(guildId);
        }

        MemberDocument memberDocument = MemberDocument.of(memberDto);
        memberDocument = memberCollection.save(memberDocument);

        GuildDocument guildDocument = result.get();
        guildDocument.addMember(memberDocument);
        guildCollection.save(guildDocument);
    }
    
    
}
