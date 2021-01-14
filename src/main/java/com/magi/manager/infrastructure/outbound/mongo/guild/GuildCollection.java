package com.magi.manager.infrastructure.outbound.mongo.guild;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GuildCollection extends MongoRepository<GuildDocument, String> {
    
}
