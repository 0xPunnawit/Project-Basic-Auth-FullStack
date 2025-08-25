package com.punnawit.auth;

import com.punnawit.auth.dto.request.auth.RegisterRequest;
import com.punnawit.auth.entity.Users;
import com.punnawit.auth.exception.BaseException;
import com.punnawit.auth.repository.UserRepository;
import com.punnawit.auth.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.UUID;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestUserService {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	public static class TestRandomDataCreate {
		RegisterRequest getRegisterRequest() {
			String unique = UUID.randomUUID().toString().substring(0, 8);
			RegisterRequest request = new RegisterRequest();
			request.setEmail("example_" + unique + "@gmail.com"); // กันซ้ำ
			request.setPassword("1234p@ssword");
			request.setName("lamine yamal");
			request.setPhone("09" + (int)(Math.random()*1_000_0000 + 10_000_000)); // กันซ้ำ
			request.setAddress("Rocafonda");
			return request;
		}
	}

	public static class TestDataCreate {
		RegisterRequest getRegisterRequest() {
			RegisterRequest request = new RegisterRequest();
			request.setEmail("XW4yS@example.com"); // กันซ้ำ
			request.setPassword("0123p@ssword");
			request.setName("kylian mbappé");
			request.setPhone("0999988888"); // กันซ้ำ
			request.setAddress("Paris");
			return request;
		}
	}

	@Test
	void testCreateSuccess() throws BaseException {
		RegisterRequest registerRequest = new TestRandomDataCreate().getRegisterRequest();

		Users saved = userService.register(registerRequest);

		Assertions.assertNotNull(saved);
		Assertions.assertNotNull(saved.getId());
		Assertions.assertEquals(registerRequest.getEmail(), saved.getEmail());
		Assertions.assertNotEquals(registerRequest.getPassword(), saved.getPassword());
		Assertions.assertEquals("USER", saved.getRole().getRole().name());

		Optional<Users> fromDb = userRepository.findByEmail(registerRequest.getEmail());
		Assertions.assertTrue(fromDb.isPresent());
	}


}
