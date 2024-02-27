package fms.projectII.service.users;

import fms.projectII.dtos.users.UsersDTO;

import java.util.List;

public interface UsersService {
    public UsersDTO create(UsersDTO dto);

    public List<UsersDTO> getAll();

    public UsersDTO getById(Integer id);

    public UsersDTO update(UsersDTO dto);

    void changePassword(String password, Integer id);

    void updateFutsalId(Integer userId, Integer futsalId);

    public void deleteById(Integer id);
}
