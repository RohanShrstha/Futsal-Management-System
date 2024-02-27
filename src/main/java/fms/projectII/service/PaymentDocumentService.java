package fms.projectII.service;

import fms.projectII.dtos.PaymentDocumentDTO;
import fms.projectII.dtos.reserve.ReserveDTO;

import java.io.IOException;
import java.util.List;

public interface PaymentDocumentService {
    public PaymentDocumentDTO create(PaymentDocumentDTO dto) throws IOException;
}
