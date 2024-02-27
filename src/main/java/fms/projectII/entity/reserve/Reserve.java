package fms.projectII.entity.reserve;

import com.fasterxml.jackson.annotation.JsonFormat;
import fms.projectII.dtos.PaymentDocumentDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.payment.Payment;
import fms.projectII.entity.payment.PaymentDocument;
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
@Table(name = "reserve")
public class Reserve {
    @Id
    @SequenceGenerator(name = "reserve_sequence", sequenceName = "reserve_sequence", allocationSize = 1)
    @GeneratedValue(generator = "reserve_sequence", strategy = GenerationType.SEQUENCE)
    private Integer booking_id;

    @OneToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @OneToOne
    @JoinColumn(name = "futsal_id")
    private Futsal futsal;

    @Column(name = "booking_start_time", length = 100)
    private String booking_start_time;

    @Column(name = "booking_end_time", length = 100)
    private String booking_end_time;

    @Column(name = "booking_date", length = 100)
    private String booking_date;

    @Column(name = "booking_status", length = 100)
    private String booking_status;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="booking_time")
    private LocalDateTime booking_time;

//    @OneToOne
//    private Payment payment;

    public Reserve(Integer booking_id) {
        booking_id = booking_id;
    }
}
