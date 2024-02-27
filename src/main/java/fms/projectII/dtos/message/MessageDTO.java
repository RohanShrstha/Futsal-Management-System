package fms.projectII.dtos.message;

import com.fasterxml.jackson.annotation.JsonInclude;
import fms.projectII.entity.message.Message;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)

public class MessageDTO {

    private Integer messageId;

    private String messageName;

    private String messageEmail;

    private String messageSubject;

    private String messageDescription;

    private LocalDateTime messageTime;

    public Message toEntity(fms.projectII.dtos.message.MessageDTO messageDTO){
        Message message =Message.builder()
                .messageId(messageDTO.getMessageId())
                .messageName(messageDTO.getMessageName())
                .messageEmail(messageDTO.getMessageEmail())
                .messageSubject(messageDTO.getMessageSubject())
                .messageDescription(messageDTO.getMessageDescription())
                .messageTime(messageDTO.getMessageTime())
                .build();
        return message;
    }

    public fms.projectII.dtos.message.MessageDTO toDto(Message message){
        fms.projectII.dtos.message.MessageDTO messageDTO = MessageDTO.builder()
                .messageId(message.getMessageId())
                .messageName(message.getMessageName())
                .messageEmail(message.getMessageEmail())
                .messageSubject(message.getMessageSubject())
                .messageDescription(message.getMessageDescription())
                .messageTime(message.getMessageTime())
                .build();
        return messageDTO;
    }
}
