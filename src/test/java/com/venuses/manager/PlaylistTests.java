package com.venuses.manager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.venuses.manager.domain.core.playlist.Playlist;

import org.junit.jupiter.api.Test;

class PlaylistTests {

	@Test
	void shouldCreatePlaylist() {
		String guildId = "123456789";
		String creator = "28761782";

		Playlist playlist = new Playlist("Rock Playlist", guildId, creator, true);
		assertNotNull(playlist.getId());
		assertEquals(0, playlist.getSongs().size());
		assertEquals(guildId, playlist.getGuildId().toString());
		assertEquals(creator, playlist.getCreator().toString());
	}

}
