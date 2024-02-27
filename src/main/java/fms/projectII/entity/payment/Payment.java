package fms.projectII.entity.payment;

import com.fasterxml.jackson.annotation.JsonFormat;
import fms.projectII.entity.images.Images;
import fms.projectII.entity.reserve.Reserve;
import fms.projectII.entity.users.Users;
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
@Table(name = "payment")

public class Payment {
    @Id
    @SequenceGenerator(name = "payment_sequence", sequenceName = "payment_sequence", allocationSize = 1)
    @GeneratedValue(generator = "payment_sequence", strategy = GenerationType.SEQUENCE)
    private Integer payment_id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="booking_id", foreignKey = @ForeignKey(name = "FK_payment_reserve"))
    private Reserve reserve;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", foreignKey = @ForeignKey(name = "FK_payment_user"))
    private Users user;

    @Column(name = "payment_method", length = 100)
    private String payment_method;

    @Column(name = "payment_amount", length = 100)
    private String payment_amount;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="payment_time")
    private LocalDateTime payment_time;

    @OneToOne
    private Images images;

    public Payment(Integer payment_id) {
        payment_id = payment_id;
    }
}
