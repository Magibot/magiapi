package com.magi.manager.infrastructure.outbound.mongo.playlist;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlaylistCollection extends MongoRepository<PlaylistDocument, String> {
    
}
