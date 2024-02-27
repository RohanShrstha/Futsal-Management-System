package fms.projectII.controller.payment;

import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.payment.PaymentDTO;
import fms.projectII.service.payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/payment")
public class PaymentController extends BaseController {
    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PaymentDTO paymentDTO) throws IOException {
        paymentDTO = paymentService.create(paymentDTO);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("payment")),paymentDTO)
        );
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<PaymentDTO> dtos = paymentService.getAll();
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("payment")),dtos)
        );
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id){
        PaymentDTO dto = paymentService.getById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get", customMessageSource.get("payment")),dto)
        );
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody PaymentDTO dto) throws IOException {
        dto = paymentService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("payment")),dto)
        );
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id){
        paymentService.deleteById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.delete", customMessageSource.get("payment")),null)
        );
    }
}
