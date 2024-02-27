package fms.projectII.service.admin;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.admin.AdminDTO;
import fms.projectII.repo.admin.AdminRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {
    private AdminRepo adminRepo;

    private CustomMessageSource customMessageSource;

    public AdminServiceImpl(AdminRepo adminRepo, CustomMessageSource customMessageSource) {
        this.adminRepo = adminRepo;
        this.customMessageSource = customMessageSource;
    }

    @Override
    public AdminDTO create(AdminDTO dto) {

        return new AdminDTO().toDto(adminRepo.save(new AdminDTO().toEntity(dto)));
    }

    @Override
    public AdminDTO update(AdminDTO dto) {
        adminRepo.findById(dto.getAdmin_id()).orElseThrow(
                ()-> new RuntimeException(customMessageSource.get("error.not.found","admin")));
        return new AdminDTO().toDto(adminRepo.save(new AdminDTO().toEntity(dto)));
    }
}
