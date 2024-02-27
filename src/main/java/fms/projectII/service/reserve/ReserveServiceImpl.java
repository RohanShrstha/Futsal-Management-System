package fms.projectII.service.reserve;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.PaymentDocumentDTO;
import fms.projectII.dtos.futsal.FutsalDTO;
import fms.projectII.dtos.payment.PaymentDTO;
import fms.projectII.dtos.reserve.ReserveDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.payment.Payment;
import fms.projectII.entity.reserve.Reserve;
import fms.projectII.entity.users.Users;
import fms.projectII.repo.futsal.FutsalRepo;
import fms.projectII.repo.reserve.ReserveRepo;
import fms.projectII.repo.users.UsersRepo;
import fms.projectII.service.PaymentDocumentService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j

public class ReserveServiceImpl implements ReserveService {

    private ReserveRepo reserveRepo;

    private UsersRepo usersRepo;

    private FutsalRepo futsalRepo;

    private CustomMessageSource customMessageSource;

    @Autowired
    private PaymentDocumentService paymentDocumentService;

    public ReserveServiceImpl(ReserveRepo reserveRepo, UsersRepo usersRepo, FutsalRepo futsalRepo, CustomMessageSource customMessageSource) {
        this.reserveRepo = reserveRepo;
        this.usersRepo = usersRepo;
        this.futsalRepo = futsalRepo;
        this.customMessageSource = customMessageSource;
    }

    @Override
    public ReserveDTO create(ReserveDTO dto) throws IOException {
        Integer userId = dto.getUsers_id();
        Users users = usersRepo.findById(userId).get();
        Futsal futsal = futsalRepo.findById(dto.getFutsal_id()).get();
        ModelMapper mapper = new ModelMapper();
//        PaymentDocumentDTO documentDTO = paymentDocumentService.create(dto.getPaymentDocumentDTO());
//        dto.setPaymentDocumentDTO(mapper.map(documentDTO, PaymentDocumentDTO.class));
        dto.setFutsal(futsal);
        dto.setUsers(users);
        Reserve r = new ReserveDTO().toEntity(dto);
//        r.setPayment(mapper.map(dto.getPaymentDTO(), Payment.class));
        reserveRepo.save(r);
        return mapper.map(r, ReserveDTO.class);
    }

    @Override
    public List<ReserveDTO> getAll() {
        List<Reserve> reserves = reserveRepo.findAll();
        List<ReserveDTO> reserveDTOS = reserves.parallelStream().map(
                x->new ReserveDTO().toDto(x)).collect(Collectors.toList());
        return  reserveDTOS;
    }

    @Override
    public ReserveDTO getById(Integer id) {
        ModelMapper mapper = new ModelMapper();
        Reserve reserve = reserveRepo.findById(id).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found",
                                customMessageSource.get("reserve")
                        )
                )
        );
        ReserveDTO reserveDTO = new ReserveDTO().toDto(reserve);
//        reserveDTO.setPaymentDTO(mapper.map(reserve.getPayment(), PaymentDTO.class));
        return reserveDTO;
    }

    @Override
    public ReserveDTO update(ReserveDTO dto) {
        reserveRepo.findById(dto.getBooking_id()).orElseThrow(
                ()-> new RuntimeException(customMessageSource.get("error.not.found","users")));
        return new ReserveDTO().toDto(reserveRepo.save(new ReserveDTO().toEntity(dto)));
    }

    @Override
    public void deleteById(Integer id) {
        reserveRepo.findById(id).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("reserve"))
                )
        );
        reserveRepo.deleteById(id);
    }

    @Override
    public List<ReserveDTO> getAllByDate(String date, Integer id) {

            // Parse the date string into a java.util.Date
//            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // Adjust the date format as needed
//            Date d = dateFormat.parse(date);
            // Call the repository method with the java.util.Date parameter
            List<Reserve> reserve = reserveRepo.findByDate(date , id);
            List<ReserveDTO> reserveDTOS = reserve.stream().map(x->new ReserveDTO().toDto(x)).collect(Collectors.toList());
            return reserveDTOS;
    }
}
