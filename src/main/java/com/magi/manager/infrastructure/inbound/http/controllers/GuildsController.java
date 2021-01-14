package com.magi.manager.infrastructure.inbound.http.controllers;

import com.magi.manager.domain.application.guild.GuildApplicationService;
import com.magi.manager.domain.application.guild.dto.GuildDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    
}
