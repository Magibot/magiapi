package com.venuses.manager;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.guild.GuildApplicationService;
import com.venuses.manager.domain.application.guild.GuildApplicationServiceImpl;
import com.venuses.manager.domain.application.guild.GuildRepository;
import com.venuses.manager.domain.application.guild.dto.DiscordServerDto;
import com.venuses.manager.domain.application.guild.dto.GuildDto;
import com.venuses.manager.domain.application.member.MemberRepository;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.core.guild.CreateGuildFactory;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberDuplicatedException;
import com.venuses.manager.setup.GuildRepositoryInMemoryImpl;
import com.venuses.manager.setup.MemberRepositoryInMemoryImpl;

import org.junit.jupiter.api.Test;

public class MemberTest {

    private List<GuildDto> guilds = new ArrayList<>();
	private List<MemberDto> members = new ArrayList<>();

	private GuildDto guild;

	private GuildRepository guildRepository = new GuildRepositoryInMemoryImpl(guilds, members);
	private MemberRepository memberRepository = new MemberRepositoryInMemoryImpl(members);
	private CreateGuildFactory createGuildFactory = new CreateGuildFactory();
	private GuildApplicationService guildApplicationService = new GuildApplicationServiceImpl(guildRepository,
			createGuildFactory, memberRepository);

    @Test
	void shouldAddMemberToGuild() throws GuildNotFoundException, MemberDuplicatedException {
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
	void shouldTryToAddDuplicatedMemberToGuild() throws GuildNotFoundException, MemberDuplicatedException {
		GuildDto guildRequest = new GuildDto("Python Community", "1234567",
			new DiscordServerDto("2", "Ireland", "Matthew"));
		guild = this.guildApplicationService.createGuild(guildRequest);
		assertNotNull(guild.getId());

		MemberDto memberRequest = new MemberDto("7356719871", "mellomaths", true);
		try {
			MemberDto member = this.guildApplicationService.addMember(guild.getId(), memberRequest);
			assertNotNull(member.getId());
			assertNotNull(member.getCreationDate());

			guild = this.guildApplicationService.getGuild(guild.getId());
			assertTrue(guild.getMembers().contains(member));

			memberRequest = new MemberDto("7356719871", "newman", true);
			MemberDuplicatedException exception = assertThrows(MemberDuplicatedException.class, () -> {
				MemberDto memberDto = new MemberDto("7356719871", "newman", true);
				this.guildApplicationService.addMember(guild.getId(), memberDto);
			});

			assertTrue(exception.getMessage().contains("idFromDiscord=7356719871"));
			assertTrue(exception.getMessage().contains("was already added to Guild"));
		} catch (MemberDuplicatedException ex) {
			fail("Duplicated member could not be generated! Check the testing database.");
		}
	}

	@Test
	void shouldAddMemberToDifferentGuilds() throws GuildNotFoundException, MemberDuplicatedException {
		GuildDto guild1 = new GuildDto("Go Community", "1234567",
			new DiscordServerDto("2", "Ireland", "Matthew"));
		guild1 = this.guildApplicationService.createGuild(guild1);
		assertNotNull(guild1);
		assertNotNull(guild1.getId());
		GuildDto guild2 = new GuildDto("Ruby Community", "1234567",
			new DiscordServerDto("3", "Netherland", "Maestro"));
		guild2 = this.guildApplicationService.createGuild(guild2);
		assertNotNull(guild2);
		assertNotNull(guild2.getId());

		MemberDto member = new MemberDto("7356719871", "mellomaths", true);
		member = this.guildApplicationService.addMember(guild1.getId(), member);
		guild1 = this.guildApplicationService.getGuild(guild1.getId());
		assertTrue(guild1.getMembers().contains(member));

		member = this.guildApplicationService.addMember(guild2.getId(), member);
		guild2 = this.guildApplicationService.getGuild(guild2.getId());
		assertTrue(guild2.getMembers().contains(member));
		
		// In case, member was overwritten in the operation 'addMember' for guild2
		// assertTrue(guild1.getMembers().contains(member));
		// assertTrue(guild2.getMembers().contains(member));
	}
    
}
