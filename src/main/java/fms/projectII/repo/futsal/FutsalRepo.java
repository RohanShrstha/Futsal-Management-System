package fms.projectII.repo.futsal;

import fms.projectII.entity.futsal.Futsal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FutsalRepo  extends JpaRepository<Futsal,Integer> {
    Optional<Futsal> findByFutsalName(String futsal_name);
}
