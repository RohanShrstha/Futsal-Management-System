package fms.projectII.entity.users;

import com.fasterxml.jackson.annotation.JsonFormat;
import fms.projectII.entity.futsal.Futsal;
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
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(name = "UNIQUE_user_email", columnNames = "user_email")
})
public class Users {
    @Id
    @SequenceGenerator(name = "users_sequence", sequenceName = "users_sequence", allocationSize = 1)
    @GeneratedValue(generator = "users_sequence", strategy = GenerationType.SEQUENCE)
    private Integer user_id;

    @Column(name = "user_name", length = 100)
    private String userName;

    @Column(name = "user_lname", length = 100)
    private String userLname;

    @Column(name = "user_email", length = 70)
    private String email;

    @Column(name = "password", length = 150)
    private String password;

    @Column(name = "contact", length = 10)
    private String contact;

    @Column(name = "address", length = 150)
    private String address;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "role", length = 50)
    private String role;

    @Column(name = "latitude", length = 50)
    private String latitude;

    @Column(name = "longitude", length = 50)
    private String longitude;

    @OneToOne
    @JoinColumn(name = "futsal_id")
    private Futsal futsal;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="join_date")
    private LocalDateTime joinDate;

    public Users(Integer user_id) {
        this.user_id = user_id;
    }

    public void setFutsalId(Integer futsalId) {
    }
}