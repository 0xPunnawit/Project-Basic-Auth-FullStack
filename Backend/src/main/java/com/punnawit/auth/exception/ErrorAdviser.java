package com.punnawit.auth.exception;

import com.punnawit.auth.dto.response.error.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorAdviser {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBase(BaseException e, HttpServletRequest req) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(e.getMessage());
        errorResponse.setPath(req.getRequestURI());
        var status = switch (e.getMessage()) {
            case "user.login.failed" -> HttpStatus.UNAUTHORIZED;
            case "user.not.found" -> HttpStatus.NOT_FOUND;
            case "user.email.exist", "user.phone.exist" -> HttpStatus.CONFLICT;
            case "user.unauthorized" -> HttpStatus.UNAUTHORIZED;
            default -> HttpStatus.BAD_REQUEST;
        };
        errorResponse.setStatus(status.value());
        return ResponseEntity.status(status).body(errorResponse);
    }

}
