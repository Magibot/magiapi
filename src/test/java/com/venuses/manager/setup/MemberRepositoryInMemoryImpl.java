package com.venuses.manager.setup;

import java.util.ArrayList;
import java.util.List;

import com.venuses.manager.domain.application.member.MemberRepository;
import com.venuses.manager.domain.application.member.dto.MemberDto;
import com.venuses.manager.domain.exception.MemberNotFoundException;

public class MemberRepositoryInMemoryImpl implements MemberRepository {

    private List<MemberDto> members = new ArrayList<>();

    public MemberRepositoryInMemoryImpl(List<MemberDto> members) {
        this.members = members;
    }

    @Override
    public MemberDto findById(String memberId) throws MemberNotFoundException {
        MemberDto member = null;
        for (MemberDto m : members) {
            if (m.getId() == memberId) {
                member = m;
            }
        }

        if (member == null) {
            throw new MemberNotFoundException(memberId);
        }

        return member;
    }

    @Override
    public MemberDto findByIdFromDiscord(String idFromDiscord) throws MemberNotFoundException {
        MemberDto member = null;
        for (MemberDto m : members) {
            if (m.getIdFromDiscord() == idFromDiscord) {
                member = m;
            }
        }

        if (member == null) {
            throw new MemberNotFoundException("ididFromDiscord=" + idFromDiscord);
        }

        return member;
    }

}
