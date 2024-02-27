package fms.projectII.abstracts;
import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {

    @Autowired
    protected CustomMessageSource customMessageSource;

    @Autowired
    protected ObjectMapper objectMapper;

    protected String moduleCode;


    protected ApiResponse successResponse(String message, Object data) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatus(true);
        apiResponse.setMessage(message);
        apiResponse.setData(data);
        return apiResponse;
    }


    protected ApiResponse errorResponse(String message, Object errors) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatus(false);
        apiResponse.setMessage(message);
        apiResponse.setData(errors);
        return apiResponse;
    }

}


