package com.venuses.manager;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.guild.GuildApplicationService;
import com.venuses.manager.domain.application.guild.GuildApplicationServiceImpl;
import com.venuses.manager.domain.application.guild.GuildRepository;
import com.venuses.manager.domain.application.guild.dto.DiscordServerDto;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.MemberRepository;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.application.playlist.dto.PlaylistDto;
import com.venuses.manager.domain.core.guild.CreateGuildFactory;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberDuplicatedException;
import com.venuses.manager.domain.exception.MemberNotFoundException;
import com.venuses.manager.setup.GuildRepositoryInMemoryImpl;
import com.venuses.manager.setup.MemberRepositoryInMemoryImpl;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ManagerApplicationTests {

	private List<GuildDto> guilds = new ArrayList<>();
	private List<MemberDto> members = new ArrayList<>();

	private GuildRepository guildRepository = new GuildRepositoryInMemoryImpl(guilds, members);
	private MemberRepository memberRepository = new MemberRepositoryInMemoryImpl(members);
	private CreateGuildFactory createGuildFactory = new CreateGuildFactory();
	private GuildApplicationService guildApplicationService = new GuildApplicationServiceImpl(guildRepository,
			createGuildFactory, memberRepository);

	@Test
	void shouldCreateGuild() {
		DiscordServerDto discordServerDto = new DiscordServerDto("1", "Brazil", "John");
		GuildDto guildDto = new GuildDto("New Discord Server Test", "8712627182982", discordServerDto);
		GuildDto guildCreated = this.guildApplicationService.createGuild(guildDto);
		assertNotNull(guildCreated);
		assertNotNull(guildCreated.getId());
		assertNotNull(guildCreated.getCreationDate());
	}

	@Test
	void shouldAddMemberToGuildCreated() throws GuildNotFoundException, MemberDuplicatedException {
		GuildDto guildRequest = new GuildDto("Java Community", "234324336",
				new DiscordServerDto("2", "Argentina", "Maria"));
		GuildDto guild = this.guildApplicationService.createGuild(guildRequest);
		assertNotNull(guild.getId());

		MemberDto memberRequest = new MemberDto("7356719871", "mellomaths", true);
		MemberDto member = this.guildApplicationService.addMember(guild.getId(), memberRequest);
		assertNotNull(member.getId());
		assertNotNull(member.getCreationDate());

		guild = this.guildApplicationService.getGuild(guild.getId());
		assertTrue(guild.getMembers().contains(member));
	}

	@Test
	void shouldCreatePlaylist() throws GuildNotFoundException, MemberNotFoundException, MemberDuplicatedException {
		GuildDto guildRequest = new GuildDto(
			"Python Community",
			"98279878926",
			new DiscordServerDto("3", "Italy", "Guido")
		);
		GuildDto guild = this.guildApplicationService.createGuild(guildRequest);
		assertNotNull(guild.getId());

		MemberDto memberRequest = new MemberDto("7356719871", "mellomaths", true);
		MemberDto member = this.guildApplicationService.addMember(guild.getId(), memberRequest);
		assertNotNull(member.getId());

		PlaylistDto playlistRequest = new PlaylistDto("Playlist of Rock", member.getId(), true, new ArrayList<>());
		PlaylistDto playlist = this.guildApplicationService.createPlaylist(guild.getId(), playlistRequest);
		assertNotNull(playlist.getId());
		assertNotNull(playlist.getCreationDate());

		guild = this.guildApplicationService.getGuild(guild.getId());
		assertTrue(guild.getPlaylists().contains(playlist));
	}

}
