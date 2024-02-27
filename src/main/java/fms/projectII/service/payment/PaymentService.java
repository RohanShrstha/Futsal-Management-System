package fms.projectII.service.payment;

import fms.projectII.dtos.payment.PaymentDTO;

import java.io.IOException;
import java.util.List;

public interface PaymentService {
    public PaymentDTO create(PaymentDTO dto) throws IOException;

    public List<PaymentDTO> getAll();

    public PaymentDTO getById(Integer id);

    public PaymentDTO update(PaymentDTO dto);

    public void deleteById(Integer id);
}
