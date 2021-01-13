package com.magi.playlistmanager.domain.core.guild;

import com.magi.playlistmanager.domain.core.ApplicationDate;
import com.magi.playlistmanager.domain.core.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Guild extends Entity {
    
    private final String name;
    private final String iconHash;
    private final DiscordServer discordServer;

}
