package com.magi.manager.infrastructure.outbound.mongo.guild;

import com.magi.manager.domain.application.guild.GuildRepository;
import com.magi.manager.domain.application.guild.dto.GuildDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class MongoGuildRepositoryImpl implements GuildRepository {

    @Autowired
    private GuildCollection guildCollection;

    @Override
    public void save(GuildDto guildDto) {
        guildCollection.save(GuildDocument.of(guildDto));
    }
    
    
}
