package com.venuses.manager.domain.application.playlist;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;

public interface PlaylistApplicationService {

    PlaylistDto createPlaylist(PlaylistDto playlistDto);
    
}
