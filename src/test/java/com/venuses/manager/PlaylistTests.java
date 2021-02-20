package com.venuses.manager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.venuses.manager.domain.core.playlist.Playlist;
import com.venuses.manager.domain.core.song.Song;
import com.venuses.manager.domain.exception.PlaylistNotOpenException;

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

	@Test
	void shouldAddSongToPlaylist() throws PlaylistNotOpenException {
		String guildId = "123456789";
		String creator = "28761782";

		Playlist playlist = new Playlist("Rock Playlist", guildId, creator, true);
		assertNotNull(playlist.getId());
		assertEquals(0, playlist.getSongs().size());
		
		String songName = "Blacking out";
		String songArtist = "Lil Wayne";
		String songYoutubeLink = "http://youtube.com/12878192";
		playlist.addSong(songName, songArtist, creator, songYoutubeLink);
		assertEquals(1, playlist.getSongs().size());

		Song songCreated = playlist.getSongs().get(0);
		assertNotNull(songCreated.getId());
		assertEquals(songName, songCreated.getName());
		assertEquals(songArtist, songCreated.getArtist());
		assertEquals(songYoutubeLink, songCreated.getYoutubeLink());
		assertEquals(playlist.getCreator().toString(), songCreated.getAddedBy().toString());
	}

	@Test
	void shouldAddSongToAnotherMemberOpenPlaylists() throws PlaylistNotOpenException {
		String guildId = "123456789";
		String creator = "28761782";

		Playlist playlist = new Playlist("Rock Playlist", guildId, creator, true);
		assertNotNull(playlist.getId());
		assertEquals(0, playlist.getSongs().size());

		String songName = "Blacking out";
		String songArtist = "Lil Wayne";
		String songYoutubeLink = "http://youtube.com/12878192";
		String anotherMember = "272532212";
		playlist.addSong(songName, songArtist, anotherMember, songYoutubeLink);
		assertEquals(1, playlist.getSongs().size());

		Song songCreated = playlist.getSongs().get(0);
		assertNotNull(songCreated.getId());
		assertEquals(songName, songCreated.getName());
		assertEquals(songArtist, songCreated.getArtist());
		assertEquals(songYoutubeLink, songCreated.getYoutubeLink());
	}

	@Test
	void shouldNotAddSongToClosedPlaylist() {
		String guildId = "123456789";
		String creator = "28761782";

		Playlist playlist = new Playlist("Rock Playlist", guildId, creator, false);
		assertNotNull(playlist.getId());
		assertEquals(0, playlist.getSongs().size());

		String songName = "Blacking out";
		String songArtist = "Lil Wayne";
		String songYoutubeLink = "http://youtube.com/12878192";
		String anotherMember = "272532212";
		PlaylistNotOpenException exception = assertThrows(
			PlaylistNotOpenException.class, 
			() -> playlist.addSong(songName, songArtist, anotherMember, songYoutubeLink));
		
		assertEquals(0, playlist.getSongs().size());
		assertTrue(exception.getMessage().contains("does not have permission to add songs to this playlist"));
	}

}
