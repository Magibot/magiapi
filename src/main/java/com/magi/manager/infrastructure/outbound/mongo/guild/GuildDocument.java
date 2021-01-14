package com.magi.manager.infrastructure.outbound.mongo.guild;

import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "guild")
public class GuildDocument extends GuildDto {

    @Id
    private final String id;

    public GuildDocument(String id, String name, String iconHash, DiscordServerDto discordServer, String creationDate) {
        super(name, iconHash, discordServer, creationDate);
        this.id = id;
    }

    public static GuildDocument of(GuildDto guildDto) {
        return new GuildDocument(
            guildDto.getId(),
            guildDto.getName(),
            guildDto.getIconHash(),
            guildDto.getDiscordServer(),
            guildDto.getCreationDate());
    }

    public GuildDto toDto() {
        return new GuildDto(
            id,
            name,
            iconHash,
            discordServer,
            creationDate
        );
    }
    
}
