package fms.projectII.service.admin;

import fms.projectII.dtos.admin.AdminDTO;

import java.util.List;

public interface AdminService {
    public AdminDTO create(AdminDTO dto);

    public AdminDTO update(AdminDTO dto);
}
