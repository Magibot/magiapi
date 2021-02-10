package com.venuses.manager.infrastructure.inbound.http.controllers;

import com.venuses.manager.domain.application.guild.GuildApplicationService;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberNotFoundException;
import com.venuses.manager.infrastructure.inbound.http.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("guilds")
public class GuildsController {

    private final GuildApplicationService guildApplicationService;

    @Autowired
    public GuildsController(final GuildApplicationService guildApplicationService) {
        this.guildApplicationService = guildApplicationService;
    }

    @PostMapping
    public ResponseEntity<GuildDto> postGuild(@RequestBody GuildDto guildDto) {
        GuildDto guildCreated = guildApplicationService.createGuild(guildDto);
        return ResponseEntity.status(201).body(guildCreated);
    }

    @GetMapping("{id}")
    public ResponseEntity<GuildDto> getGuildById(@PathVariable String id) {
        try {
            GuildDto guild = guildApplicationService.getGuild(id);
            return ResponseEntity.status(200).body(guild);
        } catch (GuildNotFoundException ex) {
            throw new ResourceNotFoundException(ex.getMessage());
        }
    }

    @PostMapping("{id}/playlists")
    public ResponseEntity<PlaylistDto> postPlaylist(@PathVariable String id, @RequestBody PlaylistDto playlistDto) {
        try {
            PlaylistDto playlist = guildApplicationService.createPlaylist(id, playlistDto);
            return ResponseEntity.status(201).body(playlist);
        } catch (GuildNotFoundException | MemberNotFoundException ex) {
            throw new ResourceNotFoundException(ex.getMessage());
        }
    }

    @PostMapping("{id}/members")
    public ResponseEntity<MemberDto> postMember(@PathVariable String id, @RequestBody MemberDto memberDto) {
        try {
            MemberDto member = guildApplicationService.addMember(id, memberDto);
            return ResponseEntity.status(201).body(member);
        } catch (GuildNotFoundException ex) {
            throw new ResourceNotFoundException(ex.getMessage());
        }
    }
    
}
