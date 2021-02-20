package com.venuses.manager.domain.application.playlist;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.domain.exception.PlaylistNotFoundException;
import com.venuses.manager.domain.exception.PlaylistNotOpenException;

public interface PlaylistApplicationService {

    PlaylistDto createPlaylist(PlaylistDto playlistDto);

    SongDto addSongToPlaylist(String playlistId, SongDto songDto) throws PlaylistNotFoundException, PlaylistNotOpenException;
    
}
