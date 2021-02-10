package com.venuses.manager.domain.application.guild;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.guild.dto.DiscordServerDto;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.MemberRepository;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.application.song.dto.SongDto;
import com.venuses.manager.domain.core.guild.CreateGuildFactory;
import com.venuses.manager.domain.core.guild.DiscordServer;
import com.venuses.manager.domain.core.guild.Guild;
import com.venuses.manager.domain.core.member.Member;
import com.venuses.manager.domain.core.playlist.Playlist;
import com.venuses.manager.domain.core.song.Song;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuildApplicationServiceImpl implements GuildApplicationService {

    private final CreateGuildFactory createGuildFactory;
    private final GuildRepository guildRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public GuildApplicationServiceImpl(
        final GuildRepository guildRepository,
        final CreateGuildFactory createGuildFactory,
        final MemberRepository memberRepository) {
            this.guildRepository = guildRepository;
            this.createGuildFactory = createGuildFactory;
            this.memberRepository = memberRepository;
    }

    private Member toMember(MemberDto memberDto) {
        return new Member(
            memberDto.getId(),
            memberDto.getIdFromDiscord(),
            memberDto.getUsername(),
            memberDto.getIsAdministrator(),
            memberDto.getCreationDate()
        );
    }

    private Song toSong(SongDto songDto) {
        return new Song(
            songDto.getId(),
            songDto.getName(),
            songDto.getArtist(),
            songDto.getAddedBy(),
            songDto.getYoutubeLink(),
            songDto.getCreationDate()
        );
    }

    private Playlist toPlaylist(PlaylistDto playlistDto) {
        List<Song> songs = new ArrayList<>();
        playlistDto.getSongs().forEach(songDto -> songs.add(toSong(songDto)));
        return new Playlist(
            playlistDto.getId(),
            playlistDto.getName(),
            playlistDto.getGuildId(),
            playlistDto.getCreator(),
            songs,
            playlistDto.getCreationDate());
    } 

    private DiscordServer toDiscordServer(DiscordServerDto discordServerDto) {
        return new DiscordServer(discordServerDto.getIdFromDiscord(), discordServerDto.getRegion(),
                discordServerDto.getOwner());
    }

    private Guild toGuild(GuildDto guildDto) {
        List<Playlist> playlists = new ArrayList<>();
        guildDto.getPlaylists().forEach(playlistDto -> playlists.add(toPlaylist(playlistDto)));
        List<Member> members = new ArrayList<>();
        guildDto.getMembers().forEach(memberDto -> members.add(toMember(memberDto)));
        DiscordServer discordServer = toDiscordServer(guildDto.getDiscordServer());
        return new Guild(
            guildDto.getId(),
            guildDto.getName(),
            guildDto.getIconHash(),
            discordServer, 
            playlists, 
            members,
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
    public PlaylistDto createPlaylist(String guildId, PlaylistDto playlistDto) throws GuildNotFoundException, MemberNotFoundException {
        memberRepository.findById(playlistDto.getCreator());
        GuildDto guildDto = guildRepository.findById(guildId);
        Guild guild = toGuild(guildDto);
        Playlist playlist = guild.createPlaylist(playlistDto.getName(), playlistDto.getCreator());
        PlaylistDto playlistCreated = PlaylistDto.from(playlist);
        guildRepository.addPlaylist(guildId, playlistCreated);
        return playlistCreated;
    }

    @Override
    public GuildDto getGuild(String id) throws GuildNotFoundException {
        return guildRepository.findById(id);
    }

    @Override
    public MemberDto addMember(String guildId, MemberDto memberDto) throws GuildNotFoundException {
        GuildDto guildDto = guildRepository.findById(guildId);
        Guild guild = toGuild(guildDto);
        Member member = guild.addMember(memberDto.getIdFromDiscord(), memberDto.getUsername(), memberDto.getIsAdministrator());
        MemberDto memberCreated = MemberDto.from(member);
        guildRepository.addMember(guildId, memberCreated);
        return memberCreated;
    }
    
}
