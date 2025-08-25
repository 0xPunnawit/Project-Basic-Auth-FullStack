package com.punnawit.auth.repository;

import com.punnawit.auth.entity.Role;
import com.punnawit.auth.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {

    Optional<Role> findByRole(Roles role);
}
