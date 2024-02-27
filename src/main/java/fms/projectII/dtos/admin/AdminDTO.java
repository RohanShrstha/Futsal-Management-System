package fms.projectII.dtos.admin;

import com.fasterxml.jackson.annotation.JsonInclude;
import fms.projectII.entity.admin.Admin;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminDTO {
    private Integer admin_id;

    private String admin_name;

    private String admin_password;

    private LocalDateTime admin_time;

    public Admin toEntity(AdminDTO adminDTO){
        Admin admin =Admin.builder()
                .admin_id(adminDTO.getAdmin_id())
                .admin_name(adminDTO.getAdmin_name())
                .admin_password(adminDTO.getAdmin_password())
                .admin_time(adminDTO.getAdmin_time())
                .build();
        return admin;
    }

    public AdminDTO toDto(Admin admin){
        AdminDTO adminDTO =AdminDTO.builder()
                .admin_id(admin.getAdmin_id())
                .admin_name(admin.getAdmin_name())
                .admin_password(admin.getAdmin_password())
                .admin_time(admin.getAdmin_time())
                .build();
        return adminDTO;
    }

}
