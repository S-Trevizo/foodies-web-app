package learn.recipemanager.controllers;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;

@ControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler(DataAccessException.class)    // DataAccessException is the super class of many Spring database exceptions
//    public ResponseEntity<ErrorResponse> handleException(DataAccessException ex) {
//        return new ResponseEntity<ErrorResponse>(
//                new ErrorResponse("Error accessing database."),
//                HttpStatus.INTERNAL_SERVER_ERROR);//500
//    }
//    @ExceptionHandler(IllegalArgumentException.class)    // IllegalArgumentException is the super class for many Java exceptions including all formatting (number, date) exceptions.
//    public ResponseEntity<ErrorResponse> handleException(IllegalArgumentException ex) {
//        return new ResponseEntity<ErrorResponse>(
//                new ErrorResponse(ex.getMessage()),
//                HttpStatus.INTERNAL_SERVER_ERROR);//500
//    }
//    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
//    public ResponseEntity<Object> handleMediaException(Exception ex) {
//        ErrorResponse errorResponse = new ErrorResponse("There is a mistake with the media type in the request");
//        return new ResponseEntity<>(errorResponse,
//                HttpStatus.UNSUPPORTED_MEDIA_TYPE);//415
//    }
//    @ExceptionHandler(HttpMessageNotReadableException.class)    // save internal server error as the very last general exception handler
//    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex ) {
//        ErrorResponse errorResponse = new ErrorResponse("http message is not readable");
//        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);//
//    }
//    @ExceptionHandler(MultipartException.class)//order global error messages by scope. broad message.
//    public ResponseEntity<Object> handleMultipartException(MultipartException ex) {
//        return new ResponseEntity<>("Wrong content type", HttpStatus.BAD_REQUEST);//400
//    }
//    @ExceptionHandler(Exception.class)    //absolute last resort
//    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
//        return new ResponseEntity<ErrorResponse>(
//                new ErrorResponse("Something went wrong on our end. Your request failed. :("),
//                HttpStatus.INTERNAL_SERVER_ERROR);//500
//    }
}
