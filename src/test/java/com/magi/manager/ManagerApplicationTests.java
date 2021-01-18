package com.magi.manager;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.magi.manager.domain.application.guild.GuildApplicationService;
import com.magi.manager.domain.application.guild.GuildApplicationServiceImpl;
import com.magi.manager.domain.application.guild.GuildRepository;
import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;
import com.magi.manager.domain.core.guild.CreateGuildFactory;
import com.magi.manager.setup.GuildRepositoryInMemoryImpl;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ManagerApplicationTests {

	private GuildRepository guildRepository = new GuildRepositoryInMemoryImpl();
	private CreateGuildFactory createGuildFactory = new CreateGuildFactory();
	private GuildApplicationService guildApplicationService = new GuildApplicationServiceImpl(guildRepository, createGuildFactory);

	@Test
	void shouldCreateGuild() {
		DiscordServerDto discordServerDto = new DiscordServerDto(
			"1", "Brazil", "John"
		);
		GuildDto guildDto = new GuildDto("New Discord Server Test", "8712627182982", discordServerDto);
		GuildDto guildCreated = this.guildApplicationService.createGuild(guildDto);
		assertNotNull(guildCreated);
		assertNotNull(guildCreated.getId());
		assertNotNull(guildCreated.getCreationDate());
	}

}
