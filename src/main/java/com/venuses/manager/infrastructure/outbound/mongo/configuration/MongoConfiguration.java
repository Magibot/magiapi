package com.venuses.manager.infrastructure.outbound.mongo.configuration;

import com.venuses.manager.infrastructure.outbound.mongo.guild.GuildCollection;

import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = GuildCollection.class)
public class MongoConfiguration {
    
}
