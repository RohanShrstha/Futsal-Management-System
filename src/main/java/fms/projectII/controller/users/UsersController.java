package fms.projectII.controller.users;

import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.users.PasswordDTO;
import fms.projectII.dtos.users.UsersDTO;
import fms.projectII.service.users.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UsersController extends BaseController {
    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }


    @PostMapping
    public ResponseEntity<?> create(@RequestBody UsersDTO usersDTO) throws IOException {
        usersDTO = usersService.create(usersDTO);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("users")),usersDTO)
        );
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<UsersDTO> dtos = usersService.getAll();
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("users")),dtos)
        );
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id){
        UsersDTO dto = usersService.getById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get", customMessageSource.get("users")),dto)
        );
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody UsersDTO dto) throws IOException {
        dto = usersService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("users")),dto)
        );
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateByPostMapping(@RequestBody UsersDTO dto) throws IOException {
        dto = usersService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("users")),dto)
        );
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordDTO dto) {
        usersService.changePassword(dto.getPassword(), dto.getUser_id());
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("users")),null)
        );
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id){
        usersService.deleteById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.delete", customMessageSource.get("users")),null)
        );
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<?> updateById(@PathVariable Integer id, @RequestBody UsersDTO dto) throws IOException {
        dto.setUser_id(id); // Set the user ID from the path variable
        dto = usersService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("users")), dto)
        );
    }

}
