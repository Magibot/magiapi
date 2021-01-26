package com.venuses.manager.domain.exception;

public class GuildNotFoundException extends Exception {

    private static final long serialVersionUID = 5013897336680136949L;

    private final String guildId;

    public GuildNotFoundException(String guildId) {
        super("Guild " + guildId + " was not found.");
        this.guildId = guildId;
    }

    public String getGuildId() {
        return guildId;
    }
    
}
