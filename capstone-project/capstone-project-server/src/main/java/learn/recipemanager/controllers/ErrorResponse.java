package learn.recipemanager.controllers;

import learn.recipemanager.domain.Result;
import learn.recipemanager.domain.ResultType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String message;

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;//500
        if (result.getType() == null || result.getType() == ResultType.INVALID) {//
            status = HttpStatus.BAD_REQUEST;//400
        } else if (result.getType() == ResultType.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;//404
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public String getMessage() {
        return message;
    }
    public ErrorResponse(String message) {
        this.message = message;
    }
}
