package fms.projectII.controller.admin;

import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.admin.AdminDTO;
import fms.projectII.dtos.users.UsersDTO;
import fms.projectII.service.admin.AdminService;
import fms.projectII.service.users.UsersService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;
import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin")
public class AdminController extends BaseController {
    private AdminService adminService;

    public AdminController(AdminService usersService) {
        this.adminService = usersService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody AdminDTO adminDTO) throws IOException {
        adminDTO = adminService.create(adminDTO);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("admin")),adminDTO)
        );
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody AdminDTO dto) throws IOException {
        dto = adminService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("admin")),dto)
        );
    }
}
