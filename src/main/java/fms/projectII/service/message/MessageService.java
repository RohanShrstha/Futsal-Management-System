package fms.projectII.service.message;

import fms.projectII.dtos.message.MessageDTO;

import java.util.List;

public interface MessageService {
    public MessageDTO create(MessageDTO dto);

    public List<MessageDTO> getAll();

    public MessageDTO getById(Integer id);

    public MessageDTO update(MessageDTO dto);

    public void deleteById(Integer id);
}
