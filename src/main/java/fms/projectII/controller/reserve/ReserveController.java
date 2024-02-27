package fms.projectII.controller.reserve;


import com.fasterxml.jackson.databind.ObjectMapper;
import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.payment.PaymentDTO;
import fms.projectII.dtos.reserve.ReserveDTO;
import fms.projectII.entity.payment.Payment;
import fms.projectII.service.payment.PaymentServiceImpl;
import fms.projectII.service.reserve.ReserveService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/reserve")
public class ReserveController extends BaseController {
    private ReserveService reserveService;

    private PaymentServiceImpl paymentService;

    public ReserveController(ReserveService reserveService, PaymentServiceImpl paymentService) {
        this.reserveService = reserveService;
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ReserveDTO reserveDTO) throws IOException {
        reserveDTO = reserveService.create(reserveDTO);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("reserve")),reserveDTO)
        );
    }

//    @PostMapping
//    public ResponseEntity<?> create( @RequestParam("dtoJson") String dtoJson,
//                                     @RequestParam(value = "images", required = false) MultipartFile imageFile) throws IOException
//    {
//        ObjectMapper mapper = new ObjectMapper();
//        ModelMapper modelMapper = new ModelMapper();
//        ReserveDTO reserveDTO = mapper.readValue(dtoJson, ReserveDTO.class);
//        PaymentDTO paymentDTO = reserveDTO.getPaymentDTO();
//        paymentDTO.setImageFile(imageFile);
//        paymentDTO = paymentService.create(paymentDTO);
//        reserveDTO.setPaymentDTO(paymentDTO);
//        reserveDTO = reserveService.create(reserveDTO);
//        return ResponseEntity.ok(
//                successResponse(customMessageSource.get(
//                        "crud.create", customMessageSource.get("reserve")),reserveDTO)
//        );
//    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<ReserveDTO> dtos = reserveService.getAll();
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("reserve")),dtos)
        );
    }

    @GetMapping("/futsal/id/{id}/date/{date}")
    public ResponseEntity<?> getAllByDate(@PathVariable String date, @PathVariable Integer id){
        List<ReserveDTO> dtos = reserveService.getAllByDate(date, id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("reserve")),dtos)
        );
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id){
        ReserveDTO dto = reserveService.getById(id);

        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get", customMessageSource.get("reserve")),dto)
        );
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody ReserveDTO dto) throws IOException {
        dto = reserveService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("reserve")),dto)
        );
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id){
        reserveService.deleteById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.delete", customMessageSource.get("reserve")),null)
        );
    }
}

