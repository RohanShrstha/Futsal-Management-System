package fms.projectII.dtos.payment;

import com.fasterxml.jackson.annotation.JsonInclude;
import fms.projectII.entity.images.Images;
import fms.projectII.entity.payment.Payment;
import fms.projectII.entity.reserve.Reserve;
import fms.projectII.entity.users.Users;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentDTO {
    private Integer payment_id;

    private Reserve reserve;

    private Users user;

    private String payment_method;

    private String payment_amount;

    private LocalDateTime payment_time;

    private MultipartFile imageFile;

    private Images images;

    public Payment toEntity(PaymentDTO paymentDTO){
        Payment payment =Payment.builder()
                .payment_id(paymentDTO.getPayment_id())
                .reserve(paymentDTO.getReserve())
                .user(paymentDTO.getUser())
                .payment_method(paymentDTO.getPayment_method())
                .payment_amount(paymentDTO.getPayment_amount())
                .payment_time(paymentDTO.getPayment_time())
                .build();
        return payment;
    }

    public PaymentDTO toDto(Payment payment){
        PaymentDTO paymentDTO =PaymentDTO.builder()
                .payment_id(payment.getPayment_id())
                .reserve(payment.getReserve())
                .user(payment.getUser())
                .payment_method(payment.getPayment_method())
                .payment_amount(payment.getPayment_amount())
                .payment_time(payment.getPayment_time())
                .build();
        return paymentDTO;
    }
}
