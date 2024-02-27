package fms.projectII.dtos;

import fms.projectII.entity.images.Images;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.OneToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDocumentDTO {
    private Integer id;
    private Images images;
    private MultipartFile file;
}
