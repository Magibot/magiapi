package com.venuses.manager.domain.application.playlist;

import java.util.ArrayList;
import java.util.List;

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

    private Song toSong(SongDto songDto) {
        return new Song(
            songDto.getId(),
            songDto.getName(),
            songDto.getArtist(),
            songDto.getAddedBy(),
            songDto.getYoutubeLink(),
            songDto.getCreationDate());
    }

    private Playlist toPlaylist(PlaylistDto playlistDto) {
        List<Song> songs = new ArrayList<>();
        playlistDto.getSongs().forEach(songDto -> songs.add(toSong(songDto)));
        return new Playlist(
            playlistDto.getId(),
            playlistDto.getName(), 
            playlistDto.getGuildId(), 
            playlistDto.getCreator(),
            playlistDto.getOpen(),
            songs,
            playlistDto.getCreationDate());
    }

    @Override
    public PlaylistDto createPlaylist(PlaylistDto playlistDto) {
        Playlist playlist = new Playlist(
            playlistDto.getName(),
            playlistDto.getGuildId(), 
            playlistDto.getCreator(), 
            playlistDto.getOpen());
        PlaylistDto playlistCreated = PlaylistDto.from(playlist);
        playlistRepository.create(playlistCreated);
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
        playlistRepository.update(playlistDto);
        return SongDto.from(song);
    }
    
}
