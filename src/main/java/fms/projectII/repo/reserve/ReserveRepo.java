package fms.projectII.repo.reserve;

import fms.projectII.dtos.reserve.ReserveDTO;
import fms.projectII.entity.reserve.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReserveRepo  extends JpaRepository<Reserve,Integer> {
    @Query(value = "SELECT * FROM reserve WHERE booking_date = :date and futsal_id = :id", nativeQuery = true)
    List<Reserve> findByDate(@Param("date") String date, @Param("id") Integer id);

}
