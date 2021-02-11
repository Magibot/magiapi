package com.venuses.manager;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import com.venuses.manager.domain.core.guild.CreateGuildFactory;
import com.venuses.manager.domain.core.guild.DiscordServer;
import com.venuses.manager.domain.core.guild.Guild;
import com.venuses.manager.domain.core.member.Member;
import com.venuses.manager.domain.exception.GuildNotFoundException;
import com.venuses.manager.domain.exception.MemberDuplicatedException;

import org.junit.jupiter.api.Test;

class MemberTests {

	private final CreateGuildFactory createGuildFactory = new CreateGuildFactory();

    @Test
	void shouldAddMemberToGuild() throws GuildNotFoundException, MemberDuplicatedException {
		DiscordServer discordServer = new DiscordServer("1", "Brazil", "John");
		Guild guild = createGuildFactory.execute("Discord Server", "12389732987", discordServer);
		assertNotNull(guild);

		Member member = guild.addMember("892797", "matthew.maestro", true);
		assertNotNull(member);
		assertNotNull(member.getId());
		assertNotNull(member.getCreationDate());

		assertTrue(guild.getMembers().contains(member));
	}

	@Test
	void shouldTryToAddDuplicatedMemberToGuild() throws GuildNotFoundException, MemberDuplicatedException {
		DiscordServer discordServer = new DiscordServer("2", "Brazil", "John");
		Guild guild = createGuildFactory.execute("Discord Server", "12389732987", discordServer);
		assertNotNull(guild);

		try {
			Member member = guild.addMember("892797", "matthew.maestro", true);
			assertNotNull(member);
			assertNotNull(member.getId());
			assertNotNull(member.getCreationDate());

			assertTrue(guild.getMembers().contains(member));

			MemberDuplicatedException exception = assertThrows(MemberDuplicatedException.class, () -> guild.addMember("892797", "matthew.maestro", true));
			assertTrue(exception.getMessage().contains("idFromDiscord=892797"));
			assertTrue(exception.getMessage().contains("was already added to Guild"));
		} catch (MemberDuplicatedException ex) {
			fail("Duplicated member could not be generated! Check the testing database.");
		}
	}

	@Test
	void shouldAddMemberToDifferentGuilds() throws GuildNotFoundException, MemberDuplicatedException {
		Guild guild1 = createGuildFactory.execute("Go Community", "1234567",
			new DiscordServer("3", "Ireland", "Matthew"));
		assertNotNull(guild1);
		assertNotNull(guild1.getId());

		Guild guild2 = createGuildFactory.execute("Ruby Community", "1234567", 
			new DiscordServer("4", "Netherland", "Maestro"));
		assertNotNull(guild2);
		assertNotNull(guild2.getId());

		// TODO: addMember(Member member)
		Member member = guild1.addMember("892797", "matthew.maestro", true);
		assertNotNull(member);
		assertNotNull(member.getId());
		assertNotNull(member.getCreationDate());
		assertTrue(guild1.getMembers().contains(member));

		Member sameMember = guild2.addMember("892797", "matthew.maestro", true);
		assertNotNull(sameMember);
		assertNotNull(sameMember.getId());
		assertNotNull(sameMember.getCreationDate());
		assertTrue(guild2.getMembers().contains(sameMember));

		// assertEquals(member.getId(), sameMember.getId());
	}
    
}
