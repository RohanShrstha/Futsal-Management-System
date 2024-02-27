package fms.projectII.repo.users;

import fms.projectII.entity.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<Users,Integer> {
    @Query(nativeQuery=true, value="select * from users where user_email = ?")
    Users findByEmail(String email);
    @Modifying
    @Transactional
    @Query(nativeQuery=true, value="update users set password = ? where user_id = ?")
    void changePassword(String pass, Integer id);
}
