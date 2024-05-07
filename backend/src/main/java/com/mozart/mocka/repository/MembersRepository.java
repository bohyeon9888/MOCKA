package com.mozart.mocka.repository;

import com.mozart.mocka.domain.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {

    Boolean existsByMemberProviderId(String providerId);

    Members findByMemberProviderId(String providerId);

    Members findByMemberNickname(String Nickname);

    Members findByMemberEmail(String email);

    Members findByMemberId(Long memberId);
}
