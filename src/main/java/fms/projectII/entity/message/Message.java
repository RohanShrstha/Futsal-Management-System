package fms.projectII.entity.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "message")
public class Message {
    @Id
    @SequenceGenerator(name = "message_sequence", sequenceName = "message_sequence", allocationSize = 1)
    @GeneratedValue(generator = "message_sequence", strategy = GenerationType.SEQUENCE)
    private Integer messageId;

    @Column(name = "messageName", length = 100)
    private String messageName;

    @Column(name = "messageEmail", length = 100)
    private String messageEmail;

    @Column(name = "messageSubject", length = 500)
    private String messageSubject;

    @Column(name = "messageDescription", length = 5000)
    private String messageDescription;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="messageTime")
    private LocalDateTime messageTime;

    public Message(Integer messageId) {
        messageId = messageId;
    }
}

