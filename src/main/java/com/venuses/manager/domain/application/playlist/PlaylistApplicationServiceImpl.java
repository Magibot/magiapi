package com.venuses.manager.domain.application.playlist;

import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.domain.core.playlist.Playlist;
import com.venuses.manager.domain.core.song.Song;
import com.venuses.manager.domain.exception.PlaylistNotFoundException;
import com.venuses.manager.domain.exception.PlaylistNotOpenException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaylistApplicationServiceImpl implements PlaylistApplicationService {

    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistApplicationServiceImpl(final PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    private Playlist toPlaylist(PlaylistDto playlistDto) {
        return new Playlist(playlistDto.getName(), playlistDto.getGuildId(), playlistDto.getCreator(),
                playlistDto.getOpen());
    }

    @Override
    public PlaylistDto createPlaylist(PlaylistDto playlistDto) {
        Playlist playlist = toPlaylist(playlistDto);
        PlaylistDto playlistCreated = PlaylistDto.from(playlist);
        playlistRepository.save(playlistCreated);
        return playlistCreated;
    }

    @Override
    public SongDto addSongToPlaylist(String playlistId, SongDto songDto)
            throws PlaylistNotFoundException, PlaylistNotOpenException {
        PlaylistDto playlistDto = playlistRepository.findById(playlistId);
        Playlist playlist = toPlaylist(playlistDto);
        Song song =playlist.addSong(
            songDto.getName(), 
            songDto.getArtist(), 
            songDto.getAddedBy(), 
            songDto.getYoutubeLink());
        playlistDto = PlaylistDto.from(playlist);
        playlistRepository.save(playlistDto);
        return SongDto.from(song);
    }
    
}
