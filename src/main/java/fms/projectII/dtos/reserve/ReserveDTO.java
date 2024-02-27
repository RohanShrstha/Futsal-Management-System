package fms.projectII.dtos.reserve;

import com.fasterxml.jackson.annotation.JsonInclude;
import fms.projectII.dtos.PaymentDocumentDTO;
import fms.projectII.dtos.payment.PaymentDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.payment.Payment;
import fms.projectII.entity.payment.PaymentDocument;
import fms.projectII.entity.reserve.Reserve;
import fms.projectII.entity.users.Users;
import lombok.*;

import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReserveDTO {
    private Integer booking_id;

    private Integer users_id;

    private Integer futsal_id;

    private Users users;

    private Futsal futsal;

    private String booking_start_time;

    private String booking_end_time;

    private String booking_date;

    private String booking_status;

    private LocalDateTime booking_time;

    private PaymentDTO paymentDTO;

    public Reserve toEntity(ReserveDTO reserveDTO){
        Reserve reserve =Reserve.builder()
                .booking_id(reserveDTO.getBooking_id())
                .users(reserveDTO.getUsers())
                .futsal(reserveDTO.getFutsal())
                .booking_start_time(reserveDTO.getBooking_start_time())
                .booking_end_time(reserveDTO.getBooking_end_time())
                .booking_date(reserveDTO.getBooking_date())
                .booking_status(reserveDTO.getBooking_status())
                .booking_time(reserveDTO.getBooking_time())
                .build();
        return reserve;
    }

    public ReserveDTO toDto(Reserve reserve){
        ReserveDTO reserveDTO =ReserveDTO.builder()
                .booking_id(reserve.getBooking_id())
                .users(reserve.getUsers())
                .futsal(reserve.getFutsal())
                .booking_start_time(reserve.getBooking_start_time())
                .booking_end_time(reserve.getBooking_end_time())
                .booking_date(reserve.getBooking_date())
                .booking_status(reserve.getBooking_status())
                .booking_time(reserve.getBooking_time())
                .build();
        return reserveDTO;
    }
}
