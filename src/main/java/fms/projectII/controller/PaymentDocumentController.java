package fms.projectII.controller;

import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.PaymentDocumentDTO;
import fms.projectII.service.PaymentDocumentService;
import fms.projectII.service.PaymentDocumentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/paymentDocument")
public class PaymentDocumentController extends BaseController {
    @Autowired
    private PaymentDocumentServiceImpl paymentDocumentService;

    @PostMapping("/paymentDetail")
    public ResponseEntity<?> createPaymentDetail(@ModelAttribute PaymentDocumentDTO dto) throws IOException {
        dto = paymentDocumentService.create(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("payment.document")),dto)
        );
    }

    @GetMapping("/paymentDetail")
    public ResponseEntity<?> getPaymentDetail(){
        PaymentDocumentDTO dto = paymentDocumentService.getById(1);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("payment.document")),dto)
        );
    }

}
