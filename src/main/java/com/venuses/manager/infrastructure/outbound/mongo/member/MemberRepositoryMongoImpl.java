package com.venuses.manager.infrastructure.outbound.mongo.member;

import java.util.Optional;

import com.venuses.manager.domain.application.member.MemberRepository;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.exception.MemberNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class MemberRepositoryMongoImpl implements MemberRepository {

    @Autowired
    private MemberCollection memberCollection;

    @Override
    public MemberDto findById(String memberId) throws MemberNotFoundException{
        Optional<MemberDocument> result = memberCollection.findById(memberId);
        if (result.isEmpty()) {
            throw new MemberNotFoundException(memberId);
        }

        MemberDocument memberDocument = result.get();
        return memberDocument.toDto();
    }
    
}
