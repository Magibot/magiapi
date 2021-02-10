package com.venuses.manager.infrastructure.outbound.mongo.member;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemberCollection extends MongoRepository<MemberDocument, String> {
    
}
