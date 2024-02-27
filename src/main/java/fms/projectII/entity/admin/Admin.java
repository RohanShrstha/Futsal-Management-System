package fms.projectII.entity.admin;

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
@Table(name = "admin")
public class Admin {
    @Id
    @SequenceGenerator(name = "admin_sequence", sequenceName = "admin_sequence", allocationSize = 1)
    @GeneratedValue(generator = "admin_sequence", strategy = GenerationType.SEQUENCE)
    private Integer admin_id;

    @Column(name = "admin_name", length = 100)
    private String admin_name;

    @Column(name = "admin_password", length = 100)
    private String admin_password;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="admin_time")
    private LocalDateTime admin_time;

    public Admin(Integer admin_id) { admin_id = admin_id;}
}
