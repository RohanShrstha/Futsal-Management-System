package fms.projectII.config;

import fms.projectII.entity.users.Users;
import fms.projectII.repo.users.UsersRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUsersDetailsService implements UserDetailsService {

    private final UsersRepo usersRepo;

    public CustomUsersDetailsService(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = usersRepo.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException(email+" Not Found");
        }
        return new CustomUsersDetails(user);
    }
}
