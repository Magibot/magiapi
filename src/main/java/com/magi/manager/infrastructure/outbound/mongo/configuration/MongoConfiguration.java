package com.magi.manager.infrastructure.outbound.mongo.configuration;

import com.magi.manager.infrastructure.outbound.mongo.guild.GuildCollection;

import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = GuildCollection.class)
public class MongoConfiguration {
    
}
