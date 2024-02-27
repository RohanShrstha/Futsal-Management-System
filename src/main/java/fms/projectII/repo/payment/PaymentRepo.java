package fms.projectII.repo.payment;

import fms.projectII.entity.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepo  extends JpaRepository<Payment,Integer> {
}
