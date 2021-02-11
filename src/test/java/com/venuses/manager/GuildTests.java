package com.venuses.manager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.venuses.manager.domain.core.guild.CreateGuildFactory;
import com.venuses.manager.domain.core.guild.DiscordServer;
import com.venuses.manager.domain.core.guild.Guild;
import com.venuses.manager.domain.core.member.Member;
import com.venuses.manager.domain.core.playlist.Playlist;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberDuplicatedException;
import com.venuses.manager.domain.exception.MemberNotFoundException;

import org.junit.jupiter.api.Test;

class GuildTests {

	private final CreateGuildFactory createGuildFactory = new CreateGuildFactory();

	@Test
	void shouldCreateGuild() {
		DiscordServer discordServer = new DiscordServer("1", "Brazil", "John");
		Guild guild = createGuildFactory.execute("Discord Server", "12389732987", discordServer);
		assertNotNull(guild);
		assertNotNull(guild.getId());
		assertNotNull(guild.getCreationDate());
	}

	@Test
	void shouldCreatePlaylist() throws GuildNotFoundException, MemberNotFoundException, MemberDuplicatedException {
		DiscordServer discordServer = new DiscordServer("1", "Brazil", "John");
		Guild guild = createGuildFactory.execute("Discord Server", "12389732987", discordServer);
		assertNotNull(guild);

		Member member = guild.addMember("892797", "matthew.maestro", true);
		assertNotNull(member);
		assertNotNull(member.getId());

		// TODO: createPlaylist(String name, Member member, Boolean open);
		Playlist playlist = guild.createPlaylist("Rock Playlist", member.getId().toString(), true);
		assertNotNull(playlist);
		assertNotNull(playlist.getId());
		assertNotNull(playlist.getCreationDate());

		// TODO: creator to be a Member object
		assertEquals(member.getId().toString(), playlist.getCreator());

		assertTrue(guild.getPlaylists().contains(playlist));
	}

}
