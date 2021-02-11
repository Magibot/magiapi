package com.venuses.manager.setup;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.playlist.PlaylistRepository;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;

public class PlaylistRepositoryInMemoryImpl implements PlaylistRepository {

    private List<PlaylistDto> playlists = new ArrayList<>();

    public PlaylistRepositoryInMemoryImpl(List<PlaylistDto> playlists) {
        this.playlists = playlists;
    }

    @Override
    public PlaylistDto findById(String playlistId) {
        for (PlaylistDto p : playlists) {
            if (p.getId() == playlistId) {
                return p;
            }
        }

        return null;
    }

    @Override
    public void update(PlaylistDto playlistDto) {
        for (PlaylistDto p : playlists) {
            if (p.getId() == playlistDto.getId()) {
                p = playlistDto;
            }
        }

    }
    
}
