package com.venuses.manager.infrastructure.outbound.mongo.playlist;

import java.util.Optional;

import com.venuses.manager.domain.application.playlist.PlaylistRepository;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.PlaylistNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PlaylistRepositoryMongoImpl implements PlaylistRepository {

    @Autowired 
    private PlaylistCollection playlistCollection;

    @Override
    public void create(PlaylistDto playlistDto) {
        playlistCollection.insert(PlaylistDocument.of(playlistDto));
    }

    @Override
    public void update(PlaylistDto playlistDto) {
        playlistCollection.save(PlaylistDocument.of(playlistDto));
    }

    @Override
    public PlaylistDto findById(String playlistId) throws PlaylistNotFoundException {
        Optional<PlaylistDocument> result = playlistCollection.findById(playlistId);
        if (result.isEmpty()) {
            throw new PlaylistNotFoundException("Playlist (id=" + playlistId + ") was not found.");
        }

        PlaylistDocument playlistDocument = result.get();
        return playlistDocument.toDto();
    }
    
}
