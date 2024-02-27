package fms.projectII.service.users;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.users.UsersDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.users.Users;
import fms.projectII.repo.users.UsersRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@Slf4j

public class UsersServiceImpl implements UsersService{
    private UsersRepo usersRepo;

    private CustomMessageSource customMessageSource;

    private PasswordEncoder passwordEncoder;

    public UsersServiceImpl(UsersRepo usersRepo, CustomMessageSource customMessageSource, PasswordEncoder passwordEncoder) {
        this.usersRepo = usersRepo;
        this.customMessageSource = customMessageSource;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UsersDTO create(UsersDTO dto) {
//        Users optionalUser2 = usersRepo.findByEmail(dto.getEmail());
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));

//        if (optionalUser2.isPresent()) {
//            String errorMessage = customMessageSource.get("duplicate.email",
//                    customMessageSource.get("users"));
//            throw new RuntimeException(errorMessage);
//        }
        return new UsersDTO().toDto(usersRepo.save(new UsersDTO().toEntity(dto)));
    }

    @Override
    public List<UsersDTO> getAll() {
        return usersRepo.findAll().parallelStream().map(x ->
                new UsersDTO().toDto(x)).collect(Collectors.toList());
    }

    @Override
    public UsersDTO getById(Integer id) {
        return new UsersDTO().toDto(usersRepo.findById(id).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found",
                                customMessageSource.get("users")
                        )
                )
        ));
    }

    @Override
    public UsersDTO update(UsersDTO dto) {
        Users users = usersRepo.findById(dto.getUser_id()).orElseThrow(
                ()-> new RuntimeException(customMessageSource.get("error.not.found","users")));
        users.setUserName(dto.getUserName());
        users.setUserLname(dto.getUserLname());
        users.setContact(dto.getContact());
        users.setAddress(dto.getAddress());
        users.setLatitude(dto.getLatitude());
        users.setLongitude(dto.getLongitude());
        return new UsersDTO().toDto(usersRepo.save(users));
    }

    @Override
    public void changePassword(String password, Integer id){
        String pass = passwordEncoder.encode(password);
        usersRepo.changePassword(pass, id);
    }

    @Override
    public void deleteById(Integer id) {
        usersRepo.findById(id).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("users"))
                )
        );
        usersRepo.deleteById(id);
    }

    @Override
    public void updateFutsalId(Integer userId, Integer futsalId) {
        // Fetch the user entity from the database by userId
        Users user = usersRepo.findById(userId).orElse(null);

        if (user != null) {
            // Update the user's futsal_id
            user.setFutsal(new Futsal(futsalId));

            // Save the updated user entity back to the database
            usersRepo.save(user);
        }
    }
}

