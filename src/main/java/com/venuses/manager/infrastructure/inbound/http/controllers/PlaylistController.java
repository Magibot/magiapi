package com.venuses.manager.infrastructure.inbound.http.controllers;

import com.venuses.manager.domain.application.playlist.PlaylistApplicationService;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

}
