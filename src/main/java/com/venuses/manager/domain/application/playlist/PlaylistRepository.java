package com.venuses.manager.domain.application.playlist;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;

public interface PlaylistRepository {

    PlaylistDto findById(String playlistId);

    void update(PlaylistDto playlistDto);
    
}
