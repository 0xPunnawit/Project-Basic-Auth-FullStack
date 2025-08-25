package com.punnawit.auth.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.punnawit.auth.entity.Users;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    @Value("${JWT_ISSUER}")
    private String jwtIssuer;

    @Value("${JWT_EXPIRATION}")
    private int jwtExpiration;

    public String tokenize(Users user) {
        Algorithm algorithm = algorithm();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);            // 1 hour

        return JWT.create()
                .withIssuer(jwtIssuer)
                .withIssuedAt(now)
                .withExpiresAt(expiryDate)
                .withSubject(user.getId())
                .withClaim("role", user.getRole().getRole().name())
                .sign(algorithm);
    }

    public DecodedJWT verify(String token) {
        try {
            JWTVerifier verifier = JWT.require(algorithm())
                    .withIssuer(jwtIssuer)
                    .build();
            return verifier.verify(token);
        } catch (Exception e) {
            log.error("JWT Verification failed: {}", e.getMessage());
            return null;
        }
    }

    public Algorithm algorithm() {
        return Algorithm.HMAC256(jwtSecret);
    }

}
