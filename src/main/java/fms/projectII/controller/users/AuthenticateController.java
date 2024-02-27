package fms.projectII.controller.users;

import fms.projectII.abstracts.BaseController;
import fms.projectII.config.JwtUtil;
import fms.projectII.dtos.users.TokenDTO;
import fms.projectII.dtos.users.UsersDTO;
import fms.projectII.entity.users.Users;
import fms.projectII.repo.users.UsersRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthenticateController extends BaseController {

    private UsersRepo usersRepo;

    private JwtUtil jwtUtil;

    private AuthenticationManager authenticationManager;

    private PasswordEncoder passwordEncoder;

    public AuthenticateController(UsersRepo usersRepo, JwtUtil jwtUtil, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.usersRepo = usersRepo;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/authenticate")
    public ResponseEntity<?> generateToken(@RequestBody UsersDTO usersDTO) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(usersDTO.getEmail(), usersDTO.getPassword())
            );
        } catch (Exception ex) {
            throw new RuntimeException(
                    customMessageSource.get("invalid",
                            customMessageSource.get("useremailpass")
                    )
            );
        }
        try {
            Users users = usersRepo.findByEmail(usersDTO.getEmail());
            String token = jwtUtil.generateToken(users.getEmail());
            TokenDTO tokenDTO = new TokenDTO().builder()
                    .user_id(users.getUser_id())
                    .userName(users.getUserName())
                    .email(users.getEmail())
                    .roles(users.getRole())
                    .token(token)
                    .message("Login Success")
                    .build();
            return ResponseEntity.ok(tokenDTO);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Forbidden");
        }
    }

}
