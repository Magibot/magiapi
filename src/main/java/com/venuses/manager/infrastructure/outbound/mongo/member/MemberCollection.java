package com.venuses.manager.infrastructure.outbound.mongo.member;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemberCollection extends MongoRepository<MemberDocument, String> {

    List<MemberDocument> findByIdFromDiscord(String idFromDiscord);
    
}
