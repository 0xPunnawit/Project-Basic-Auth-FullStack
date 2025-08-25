package com.punnawit.auth.config;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.punnawit.auth.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        // Check if the token is present and valid
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);

            try {
                DecodedJWT decodedJWT = jwtUtil.verify(token);

                // If the JWT token is valid
                if (decodedJWT != null) {
                    String userId = decodedJWT.getSubject();
                    String role = decodedJWT.getClaim("role").asString();

                    ArrayList<GrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role));

                    // Set authentication in SecurityContext
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userId,
                            null,
                            authorities
                    );

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } else {
                    // Clear SecurityContext if the token is invalid or expired
                    SecurityContextHolder.clearContext();
                    filterChain.doFilter(request, response);
                    return;
                }
            } catch (Exception e) {
                // Handle cases where token verification fails
                SecurityContextHolder.clearContext();  // Clear context in case of exception
                filterChain.doFilter(request, response);
                return;
            }
        }
        // Pass the request to the next filter
        filterChain.doFilter(request, response);
    }
}
