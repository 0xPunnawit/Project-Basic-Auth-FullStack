package com.punnawit.auth.repository;

import com.punnawit.auth.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, String> {

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<Users> findById(String id);

    // ============ ADMIN ============
    List<Users> findAll();

    void deleteById(String id);

    long count();


}
