package com.magi.manager.infrastructure.outbound.mongo.guild;

import java.util.Optional;

import com.magi.manager.domain.application.guild.GuildRepository;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;
import com.magi.manager.infrastructure.outbound.mongo.playlist.PlaylistCollection;
import com.magi.manager.infrastructure.outbound.mongo.playlist.PlaylistDocument;

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

    @Override
    public void save(GuildDto guildDto) {
        guildCollection.save(GuildDocument.of(guildDto));
    }

    @Override
    public void addPlaylist(String guildId, PlaylistDto playlistDto) {
        Optional<GuildDocument> result = guildCollection.findById(guildId);
        if (result.isEmpty()) {
            return;
        }

        PlaylistDocument playlistDocument = PlaylistDocument.of(playlistDto);
        playlistDocument = playlistCollection.save(playlistDocument);

        GuildDocument guildDocument = result.get();
        guildDocument.addPlaylist(playlistDocument);
        guildCollection.save(guildDocument);
    }

    @Override
    public GuildDto findById(String guildId) {
        Optional<GuildDocument> result = guildCollection.findById(guildId);
        if (result.isEmpty()) {
            return null;
        }

        GuildDocument guildDocument = result.get();
        return guildDocument.toDto();
    }
    
    
}
