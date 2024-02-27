package fms.projectII.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokenDTO {
    private  Integer user_id;
    private String userName;
    private String email;
    private String roles;
    private String token;
    private String message;
}