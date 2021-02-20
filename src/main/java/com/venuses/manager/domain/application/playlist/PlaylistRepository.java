package com.venuses.manager.domain.application.playlist;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.PlaylistNotFoundException;

public interface PlaylistRepository {

    void update(PlaylistDto playlistDto);

    void create(PlaylistDto playlistDto);

    PlaylistDto findById(String playlistId) throws PlaylistNotFoundException;
    
}
