package com.punnawit.auth.Initializer;

import com.punnawit.auth.entity.Role;
import com.punnawit.auth.entity.Roles;
import com.punnawit.auth.entity.Users;
import com.punnawit.auth.repository.RoleRepository;
import com.punnawit.auth.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            for (Roles role : Roles.values()) {
                roleRepository.save(new Role(role));
                log.info("Saved role: {}", role.name());
            }
        }

        if (userRepository.count() == 0) {
            Role adminRole = roleRepository.findByRole(Roles.ADMIN)
                    .orElseThrow(() -> new IllegalArgumentException("Role ADMIN not found"));

            Users admin = new Users();
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("Admin");
            admin.setPhone("1234567890");
            admin.setAddress("Admin Address");
            admin.setRole(adminRole);

            userRepository.save(admin);
            log.info("Saved admin: {}", admin.getEmail());

        }

    }
}
