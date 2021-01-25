package com.magi.manager;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.magi.manager.domain.application.guild.GuildApplicationService;
import com.magi.manager.domain.application.guild.GuildApplicationServiceImpl;
import com.magi.manager.domain.application.guild.GuildRepository;
import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.application.member.dto.MemberDto;
import com.magi.manager.domain.core.guild.CreateGuildFactory;
import com.magi.manager.domain.exception.GuildNotFoundException;
import com.magi.manager.setup.GuildRepositoryInMemoryImpl;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ManagerApplicationTests {

	private GuildRepository guildRepository = new GuildRepositoryInMemoryImpl();
	private CreateGuildFactory createGuildFactory = new CreateGuildFactory();
	private GuildApplicationService guildApplicationService = new GuildApplicationServiceImpl(guildRepository,
			createGuildFactory);

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
	void shouldAddMemberToGuildCreated() throws GuildNotFoundException {
		GuildDto guildRequest = new GuildDto(
			"Java Community", 
			"234324336",
			new DiscordServerDto("2", "Argentina", "Maria")
		);
		GuildDto guild = this.guildApplicationService.createGuild(guildRequest);
		assertNotNull(guild.getId());

		MemberDto memberRequest = new MemberDto("7356719871", "mellomaths", true);
		MemberDto member = this.guildApplicationService.addMember(guild.getId(), memberRequest);
		assertNotNull(member.getId());
		assertNotNull(member.getCreationDate());

		guild = this.guildApplicationService.getGuild(guild.getId());
		assertTrue(guild.getMembers().contains(member));
	}

}
