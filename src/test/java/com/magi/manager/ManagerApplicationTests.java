package com.magi.manager;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.magi.manager.domain.application.guild.GuildApplicationService;
import com.magi.manager.domain.application.guild.dto.DiscordServerDto;
import com.magi.manager.domain.application.guild.dto.GuildDto;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ManagerApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private GuildApplicationService guildApplicationService;

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
