package com.cg.iba.exception;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;



@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {



   @ExceptionHandler(DetailsNotFoundException.class)
    public ResponseEntity<String> HandlerDetailsNotFoundException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
      
    }



   @ExceptionHandler(InvalidDetailsException.class)
    public ResponseEntity<String> HandlerInvalidDetailsException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       
    }



   @ExceptionHandler(EmptyListException.class)
    public ResponseEntity<String> HandlerEmptyListException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       
    }
   
   
   @ExceptionHandler( InvalidAmountException.class)
   public ResponseEntity<String> HandlerInvalidAmountException(Exception e) {
       return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
      
   }
   
   @ExceptionHandler(InvalidAccountException.class)
   public ResponseEntity<String> HandlerInvalidAccountException(Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       
   }

   
   @ExceptionHandler(LowBalanceException.class)
   public ResponseEntity<String> HandlerLowBalanceException(Exception e) {
       return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       
   }


}