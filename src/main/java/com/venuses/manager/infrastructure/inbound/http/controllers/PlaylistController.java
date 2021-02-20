package com.venuses.manager.infrastructure.inbound.http.controllers;

import com.venuses.manager.domain.application.playlist.PlaylistApplicationService;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.domain.exception.PlaylistNotFoundException;
import com.venuses.manager.domain.exception.PlaylistNotOpenException;
import com.venuses.manager.infrastructure.inbound.http.exception.BusinessRuleException;
import com.venuses.manager.infrastructure.inbound.http.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("playlists")
public class PlaylistController {
    
    @Autowired
    private PlaylistApplicationService playlistApplicationService;

    @PostMapping
    public ResponseEntity<PlaylistDto> postPlaylist(@RequestBody PlaylistDto playlistDto) {
        PlaylistDto playlistCreated = playlistApplicationService.createPlaylist(playlistDto);
        return ResponseEntity.status(201).body(playlistCreated);
    }

    @PostMapping("{id}/songs")
    public ResponseEntity<SongDto> postSong(@PathVariable String id, @RequestBody SongDto songDto) {
        try {
            SongDto songCreated = playlistApplicationService.addSongToPlaylist(id, songDto);
            return ResponseEntity.status(201).body(songCreated);
        } catch (PlaylistNotFoundException ex) {
            throw new ResourceNotFoundException(ex.getMessage());
        } catch (PlaylistNotOpenException ex) {
            throw new BusinessRuleException(ex.getMessage());
        }
    }

}
