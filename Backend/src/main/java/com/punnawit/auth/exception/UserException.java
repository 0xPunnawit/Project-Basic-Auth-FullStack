package com.punnawit.auth.exception;

public class UserException extends BaseException {
    public UserException(String code) {
        super("user." + code);
    }

    public static UserException emailExist() {
        return new UserException("email.exist");
    }

    public static UserException phoneExist() {
        return new UserException("phone.exist");
    }

    public static UserException roleNotFound() {
        return new UserException("role.not.found");
    }

    public static UserException notFound() {
        return new UserException("not.found");
    }

    public static UserException loginFailEmailNotFound() {
        return new UserException("login.failed");
    }

    public static UserException loginFailPasswordIncorrect() {
        return new UserException("login.failed");
    }


}
