package com.venuses.manager.infrastructure.outbound.mongo.guild;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.guild.dto.DiscordServerDto;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.infrastructure.outbound.mongo.member.MemberDocument;
import com.venuses.manager.infrastructure.outbound.mongo.playlist.PlaylistDocument;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "guild")
public class GuildDocument {

    @Id
    private final String id;

    private final String name;
    private final String iconHash;
    private final DiscordServerDto discordServer;
    private final List<PlaylistDocument> playlists;
    private final List<MemberDocument> members;
    private final String creationDate;

    public GuildDocument(String id, String name, String iconHash, DiscordServerDto discordServer, List<PlaylistDocument> playlists, List<MemberDocument> members, String creationDate) {
        this.id = id;
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
        this.playlists = playlists;
        this.members = members;
        this.creationDate = creationDate;
    }

    public static GuildDocument of(GuildDto guildDto) {
        List<PlaylistDocument> playlistDocuments = new ArrayList<>();
        guildDto.getPlaylists().forEach(p -> playlistDocuments.add(PlaylistDocument.of(p)));
        List<MemberDocument> memberDocuments = new ArrayList<>();
        guildDto.getMembers().forEach(m -> memberDocuments.add(MemberDocument.of(m)));
        return new GuildDocument(
            guildDto.getId(),
            guildDto.getName(),
            guildDto.getIconHash(),
            guildDto.getDiscordServer(),
            playlistDocuments,
            memberDocuments,
            guildDto.getCreationDate());
    }

    public GuildDto toDto() {
        List<PlaylistDto> playlistDtos = new ArrayList<>();
        playlists.forEach(playlist -> playlistDtos.add(playlist.toDto()));
        List<MemberDto> memberDtos = new ArrayList<>();
        members.forEach(member -> memberDtos.add(member.toDto()));
        return new GuildDto(
            id,
            name,
            iconHash,
            discordServer,
            playlistDtos,
            memberDtos,
            creationDate
        );
    }

    public void addPlaylist(PlaylistDocument playlistDocument) {
        playlists.add(playlistDocument);
    }

    public void addMember(MemberDocument memberDocument) {
        members.add(memberDocument);
    }
    
}
