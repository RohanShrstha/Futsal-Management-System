package fms.projectII.entity.payment;

import fms.projectII.entity.images.Images;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.awt.*;

@Entity
@Data
@Getter
@Setter
public class PaymentDocument {
    @Id
    @SequenceGenerator(name = "paymentd_sequence", sequenceName = "paymentd_sequence", allocationSize = 1)
    @GeneratedValue(generator = "paymentd_sequence", strategy = GenerationType.SEQUENCE)
    private Integer id;
    @OneToOne
    private Images images;
}
