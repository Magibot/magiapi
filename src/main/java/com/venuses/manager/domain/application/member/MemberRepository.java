package com.venuses.manager.domain.application.member;

import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.exception.MemberNotFoundException;

public interface MemberRepository {

    MemberDto findById(String memberId) throws MemberNotFoundException;

    MemberDto findByIdFromDiscord(String idFromDiscord) throws MemberNotFoundException;
    
}
