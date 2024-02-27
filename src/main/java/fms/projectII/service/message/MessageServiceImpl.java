package fms.projectII.service.message;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.message.MessageDTO;
import fms.projectII.entity.message.Message;
import fms.projectII.repo.message.MessageRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@Slf4j

public class MessageServiceImpl implements MessageService{

    private MessageRepo messageRepo;

    private CustomMessageSource customMessageSource;

    public MessageServiceImpl(MessageRepo messageRepo, CustomMessageSource customMessageSource) {
        this.messageRepo = messageRepo;
        this.customMessageSource = customMessageSource;
    }
    @Override
    public MessageDTO create(MessageDTO dto) {
        Optional<Message> optionalUser1 = messageRepo.findByMessageEmail(dto.getMessageEmail());

        if (optionalUser1.isPresent()) {
            String errorMessage = customMessageSource.get("duplicate.email",
                    customMessageSource.get("message"));
            throw new RuntimeException(errorMessage);
        }
        return new MessageDTO().toDto(messageRepo.save(new MessageDTO().toEntity(dto)));
    }

    @Override
    public List<MessageDTO> getAll() {
        return messageRepo.findAll().parallelStream().map(x ->
                new MessageDTO().toDto(x)).collect(Collectors.toList());
    }

    @Override
    public MessageDTO getById(Integer id) {
        return new MessageDTO().toDto(messageRepo.findById(id).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found",
                                customMessageSource.get("message")
                        )
                )
        ));
    }

    @Override
    public MessageDTO update(MessageDTO dto) {
        messageRepo.findById(dto.getMessageId()).orElseThrow(
                ()-> new RuntimeException(customMessageSource.get("error.not.found","message")));
        return new MessageDTO().toDto(messageRepo.save(new MessageDTO().toEntity(dto)));
    }

    @Override
    public void deleteById(Integer id) {
        messageRepo.findById(id).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("message"))
                )
        );
        messageRepo.deleteById(id);
    }
}
