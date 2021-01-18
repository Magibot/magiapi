package com.magi.manager.domain.application.guild;

import java.util.ArrayList;
import java.util.List;

import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.playlist.dto.PlaylistDto;
import com.magi.manager.domain.core.guild.CreateGuildFactory;
import com.magi.manager.domain.core.guild.DiscordServer;
import com.magi.manager.domain.core.guild.Guild;
import com.magi.manager.domain.core.playlist.Playlist;
import com.magi.manager.domain.exception.GuildNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuildApplicationServiceImpl implements GuildApplicationService {

    private final CreateGuildFactory createGuildFactory;

    private final GuildRepository guildRepository;

    @Autowired
    public GuildApplicationServiceImpl(final GuildRepository guildRepository, final CreateGuildFactory createGuildFactory) {
        this.guildRepository = guildRepository;
        this.createGuildFactory = createGuildFactory;
    }

    private Playlist toPlaylist(PlaylistDto playlistDto) {
        return new Playlist(
            playlistDto.getId(),
            playlistDto.getName(),
            playlistDto.getGuildId(),
            playlistDto.getCreator(),
            playlistDto.getCreationDate());
    } 

    private DiscordServer toDiscordServer(DiscordServerDto discordServerDto) {
        return new DiscordServer(discordServerDto.getIdFromDiscord(), discordServerDto.getRegion(),
                discordServerDto.getOwner());
    }

    private Guild toGuild(GuildDto guildDto) {
        List<Playlist> playlists = new ArrayList<>();
        guildDto.getPlaylists().forEach(playlistDto -> playlists.add(toPlaylist(playlistDto)));
        DiscordServer discordServer = this.toDiscordServer(guildDto.getDiscordServer());
        return new Guild(
            guildDto.getId(),
            guildDto.getName(),
            guildDto.getIconHash(),
            discordServer, 
            playlists, 
            guildDto.getCreationDate());
    }

    @Override
    public GuildDto createGuild(GuildDto guildDto) {
        Guild guild = createGuildFactory.execute(
            guildDto.getName(), 
            guildDto.getIconHash(), 
            toDiscordServer(guildDto.getDiscordServer()));
        GuildDto guildCreated = GuildDto.from(guild);
        this.guildRepository.save(guildCreated);
        return guildCreated;
    }

    @Override
    public PlaylistDto createPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException {
        GuildDto guildDto = guildRepository.findById(guildId);
        Guild guild = toGuild(guildDto);
        Playlist playlist = guild.createPlaylist(playlistDto.getName(), playlistDto.getCreator());
        PlaylistDto playlistCreated = PlaylistDto.from(playlist);
        guildRepository.addPlaylist(guildId, playlistCreated);;
        return playlistCreated;
    }

    @Override
    public GuildDto getGuild(String id) throws GuildNotFoundException {
        return guildRepository.findById(id);
    }
    
}
