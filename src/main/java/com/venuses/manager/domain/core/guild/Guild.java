package com.venuses.manager.domain.core.guild;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.core.Entity;
import com.venuses.manager.domain.core.member.Member;
import com.venuses.manager.domain.core.playlist.Playlist;

public class Guild extends Entity {
    
    private final String name;
    private final String iconHash;
    private final DiscordServer discordServer;
    private final List<Playlist> playlists;
    private final List<Member> members;

    public Guild(String name, String iconHash, DiscordServer discordServer) {
        super();
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
        this.playlists = new ArrayList<>();
        this.members = new ArrayList<>();
    }

    public Guild(String id, String name, String iconHash, DiscordServer discordServer, List<Playlist> playlists, List<Member> members, String creationDate) {
        super(id, creationDate);
        this.name = name;
        this.iconHash = iconHash;
        this.discordServer = discordServer;
        this.playlists = playlists;
        this.members = members;
    }

    public Playlist createPlaylist(String name, String creator) {
        Playlist newPlaylist = new Playlist(name, this.getId(), creator);
        playlists.add(newPlaylist);
        return newPlaylist;
    }

    public Member addMember(String idFromDiscord, String name, Boolean isAdministrator) {
        Member newMember = new Member(idFromDiscord, name, isAdministrator);
        members.add(newMember);
        return newMember;
    }

    public String getName() {
        return name;
    }

    public String getIconHash() {
        return iconHash;
    }

    public DiscordServer getDiscordServer() {
        return discordServer;
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    public List<Member> getMembers() {
        return members;
    }

}
