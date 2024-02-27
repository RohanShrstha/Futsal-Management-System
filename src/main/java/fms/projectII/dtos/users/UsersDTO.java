package fms.projectII.dtos.users;

import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.users.Users;
import fms.projectII.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsersDTO {

    private Integer user_id;

    private String userName;

    private String userLname;

    private String reserve;

    private String email;

    private String password;

    private String contact;
    
    private String address;

    private String status;
    
    private String role;

    private String latitude;

    private String longitude;

    private Futsal futsal;
    
    private LocalDateTime joinDate;

    public Users toEntity(UsersDTO usersDTO){
        Users users =Users.builder()
                .user_id(usersDTO.getUser_id())
                .address(usersDTO.getAddress())
                .contact(usersDTO.getContact())
                .email(usersDTO.getEmail())
                .userName(usersDTO.getUserName())
                .userLname(usersDTO.getUserLname())
                .password(usersDTO.getPassword())
                .role(usersDTO.getRole())
                .latitude(usersDTO.getLatitude())
                .longitude(usersDTO.getLongitude())
                .joinDate(usersDTO.getJoinDate())
                .futsal(usersDTO.getFutsal())
                .status(usersDTO.getStatus())
                .build();
        return users;
    }

    public UsersDTO toDto(Users users){
        UsersDTO usersDTO =UsersDTO.builder()
                .user_id(users.getUser_id())
                .address(users.getAddress())
                .contact(users.getContact())
                .email(users.getEmail())
                .userName(users.getUserName())
                .userLname(users.getUserLname())
                .password(users.getPassword())
                .role(users.getRole())
                .latitude(users.getLatitude())
                .longitude(users.getLongitude())
                .joinDate(users.getJoinDate())
                .futsal(users.getFutsal())
                .status(users.getStatus())
                .build();
        return usersDTO;
    }

}
