package fms.projectII.service.payment;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.images.ImagesDTO;
import fms.projectII.dtos.payment.PaymentDTO;
import fms.projectII.entity.images.Images;
import fms.projectII.entity.payment.Payment;
import fms.projectII.repo.payment.PaymentRepo;
import fms.projectII.service.images.ImagesServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService{
    private PaymentRepo paymentRepo;

    private CustomMessageSource customMessageSource;
    @Autowired
    private ImagesServiceImpl imagesService;

    public PaymentServiceImpl(PaymentRepo paymentRepo, CustomMessageSource customMessageSource) {
        this.paymentRepo = paymentRepo;
        this.customMessageSource = customMessageSource;
    }

    @Override
    public PaymentDTO create(PaymentDTO dto) throws IOException {
        ModelMapper mapper = new ModelMapper();
        if(dto.getImageFile() != null){
            ImagesDTO imagesDTO = imagesService.create(dto.getImageFile());
            dto.setImages(mapper.map(imagesDTO, Images.class));
        }
        Payment p = mapper.map(dto, Payment.class);
        p =  paymentRepo.save(p);
        dto = mapper.map(p, PaymentDTO.class);
        return dto;

//        return new PaymentDTO().toDto(paymentRepo.save(new PaymentDTO().toEntity(dto)));
    }

    @Override
    public List<PaymentDTO> getAll() {
        return paymentRepo.findAll().parallelStream().map(x ->
                new PaymentDTO().toDto(x)).collect(Collectors.toList());
    }

    @Override
    public PaymentDTO getById(Integer id) {
        return new PaymentDTO().toDto(paymentRepo.findById(id).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found",
                                customMessageSource.get("payment")
                        )
                )
        ));
    }


    @Override
    public PaymentDTO update(PaymentDTO dto) {
        paymentRepo.findById(dto.getPayment_id()).orElseThrow(
                ()-> new RuntimeException(customMessageSource.get("error.not.found","payment")));
        return new PaymentDTO().toDto(paymentRepo.save(new PaymentDTO().toEntity(dto)));
    }

    @Override
    public void deleteById(Integer id) {
        paymentRepo.findById(id).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("payment"))
                )
        );
        paymentRepo.deleteById(id);
    }
}
