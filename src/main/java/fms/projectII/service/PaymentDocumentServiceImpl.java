package fms.projectII.service;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.PaymentDocumentDTO;
import fms.projectII.dtos.images.ImagesDTO;
import fms.projectII.dtos.reserve.ReserveDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.images.Images;
import fms.projectII.entity.payment.PaymentDocument;
import fms.projectII.entity.reserve.Reserve;
import fms.projectII.entity.users.Users;
import fms.projectII.repo.PaymentDocumentRepo;
import fms.projectII.repo.images.ImagesRepo;
import fms.projectII.service.images.ImagesServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentDocumentServiceImpl implements PaymentDocumentService{
    @Autowired
    private PaymentDocumentRepo repo;
    @Autowired
    private ImagesServiceImpl imagesService;
    @Autowired
    private CustomMessageSource customMessageSource;
    @Autowired
    private ImagesRepo imagesRepo;

    public PaymentDocumentDTO create(PaymentDocumentDTO dto) throws IOException {
        ModelMapper mapper = new ModelMapper();
        ImagesDTO imagesDTO = imagesService.create(dto.getFile());
        if(dto.getId() != null) {
            imagesRepo.findById(dto.getImages().getId())
                    .ifPresent(images -> imagesService.deleteById(dto.getImages().getId()));
        }
        dto.setImages(mapper.map(imagesDTO, Images.class));
        PaymentDocument d = repo.save(mapper.map(dto, PaymentDocument.class));
        return mapper.map(d, PaymentDocumentDTO.class);

    }

    public PaymentDocumentDTO getById(int i) {
        ModelMapper mapper = new ModelMapper();
        PaymentDocument paymentDocument = repo.findById(i).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found",
                                customMessageSource.get("reserve")
                        )
                )
        );
        return mapper.map(paymentDocument, PaymentDocumentDTO.class);
    }
}
