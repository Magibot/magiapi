package com.venuses.manager.domain.application.playlist;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.core.playlist.Playlist;

import org.springframework.beans.factory.annotation.Autowired;

public class PlaylistApplicationServiceImpl implements PlaylistApplicationService {

    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistApplicationServiceImpl(
        final PlaylistRepository playlistRepository
    ) {
        this.playlistRepository = playlistRepository;
    }

    private Playlist toPlaylist(PlaylistDto playlistDto) {
        return new Playlist(
            playlistDto.getName(),
            playlistDto.getGuildId(),
            playlistDto.getCreator(),
            playlistDto.getOpen());
    }

    @Override
    public PlaylistDto createPlaylist(PlaylistDto playlistDto) {
        Playlist playlist = toPlaylist(playlistDto);
        PlaylistDto playlistCreated = PlaylistDto.from(playlist);
        playlistRepository.save(playlistCreated);
        return playlistCreated;
    }
    
}
