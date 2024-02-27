package fms.projectII.exception;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.ApiResponse;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

public class CustomRestExceptionHandler  extends ResponseEntityExceptionHandler {

    @Autowired
    private CustomMessageSource customMessageSource;

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> internalServerError(final RuntimeException ex, final WebRequest request){
        return new ResponseEntity<>(new ApiResponse(false, ex.getLocalizedMessage(), ex.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({FileSizeLimitExceededException.class})
    @ResponseBody
    public ResponseEntity<Object> fileSizeError(DataIntegrityViolationException ex, WebRequest request){
        final ApiResponse apiError = new ApiResponse(false, String.valueOf(customMessageSource.get("error.database.error")+ex.getClass().getName()),"File size over the limit");
        return new ResponseEntity<Object>(apiError, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    @ResponseBody
    public ResponseEntity<Object> handleConstraintViolation(DataIntegrityViolationException ex, WebRequest request) {
        final List<String> errors = new ArrayList<String>();
        String fieldName = "";
        if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
            org.hibernate.exception.ConstraintViolationException violation = ((org.hibernate.exception.ConstraintViolationException) ex.getCause());

            if (violation.getConstraintName().contains("unique_")) {
                String[] datas = violation.getConstraintName().split("_");
                String message = customMessageSource.get(datas[datas.length - 1]);
                errors.add(customMessageSource.get("error.already.exist",
                        message.contains(".") ? customMessageSource.get(message) : message
                ));
            } else if (violation.getConstraintName().contains("_check"))
                errors.add(customMessageSource.get("error.check.constraint", violation.getConstraintName().split("_check")[0]));
            else if (violation.getCause().getLocalizedMessage().contains("not-null"))
                errors.add(customMessageSource.get("error.doesn't.exist", violation.getConstraintName()));
            else if (violation.getCause().getLocalizedMessage().contains("is not present in table"))
                errors.add(customMessageSource.get("error.doesn't.exist", violation.getConstraintName().replace("fk_", "")));
            else if (violation.getCause().getLocalizedMessage().contains("is still referenced")) {
                String[] constraintName = violation.getConstraintName().split("_");
                fieldName = null;
                try {
                    fieldName = customMessageSource.get(constraintName[0]);
                    errors.add(customMessageSource.get("could.not.delete", fieldName));

                } catch (Exception e) {
                    fieldName = customMessageSource.get("used.in.other.location");
                    errors.add(customMessageSource.get("could.not.delete", fieldName));

                }
            } else
                errors.add(customMessageSource.get("error.database.error"));
            HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
            final ApiResponse apiError = new ApiResponse(false, String.valueOf(httpStatus.value()), errors.get(0));
            return new ResponseEntity<>(apiError, new HttpHeaders(), httpStatus);
        } else if (ex.getCause() instanceof org.hibernate.exception.DataException) {
            org.hibernate.exception.DataException violation = ((org.hibernate.exception.DataException) ex.getCause());
            if (violation.getCause().toString().contains("value too long for type character varying(255)")) {
                fieldName = customMessageSource.get("used.in.other.location");
                errors.add("Text length more than 255 characters");
            }
            HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
            final ApiResponse apiError = new ApiResponse(false, String.valueOf(httpStatus.value()), errors.get(0));
            return new ResponseEntity<Object>(apiError, new HttpHeaders(), httpStatus);
        }
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        logger.info(">>>>>>>>>>>>> Error not handled here so , Please contact operator >>>>>>>> ");
        ex.printStackTrace();
        final ApiResponse apiError = new ApiResponse(false, String.valueOf(customMessageSource.get("error.database.error")+ex.getClass().getName()), errors.get(0));
        return new ResponseEntity<>(apiError, new HttpHeaders(), httpStatus);
    }
}
