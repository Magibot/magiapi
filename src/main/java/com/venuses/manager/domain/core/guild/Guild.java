package com.venuses.manager.domain.core.guild;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.core.Entity;
import com.venuses.manager.domain.core.member.Member;
import com.venuses.manager.domain.core.playlist.Playlist;
import com.venuses.manager.domain.exception.MemberDuplicatedException;

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

    public Playlist createPlaylist(String name, String creator, Boolean open) {
        Playlist newPlaylist = new Playlist(name, this.getId(), creator, open);
        playlists.add(newPlaylist);
        return newPlaylist;
    }

    public Member addMember(String idFromDiscord, String name, Boolean isAdministrator) throws MemberDuplicatedException {
        Member newMember = new Member(idFromDiscord, name, isAdministrator);
        Member existingMember = getMemberByIdFromDiscord(idFromDiscord);
        if (existingMember != null) {
            throw new MemberDuplicatedException("Member " + name + " (idFromDiscord=" + idFromDiscord + ") was already added to Guild " + this.name + "(id=" + this.id + ").");
        }

        members.add(newMember);
        return newMember;
    }

    public Member getMemberByIdFromDiscord(String idFromDiscord) {
        for (Member m : members ) {
            if (m.getIdFromDiscord() == idFromDiscord) {
                return m;
            }
        }

        return null;
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
