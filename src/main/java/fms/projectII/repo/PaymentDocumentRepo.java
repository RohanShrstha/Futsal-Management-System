package fms.projectII.repo;

import fms.projectII.entity.payment.PaymentDocument;
import fms.projectII.entity.reserve.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;

public interface   PaymentDocumentRepo extends JpaRepository<PaymentDocument,Integer> {
}
