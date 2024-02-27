package fms.projectII.service.reserve;

import fms.projectII.dtos.futsal.FutsalDTO;
import fms.projectII.dtos.reserve.ReserveDTO;

import java.io.IOException;
import java.util.List;

public interface ReserveService {
    public ReserveDTO create(ReserveDTO dto) throws IOException;

    public List<ReserveDTO> getAll();

    public ReserveDTO getById(Integer id);

    public ReserveDTO update(ReserveDTO dto);

    public void deleteById(Integer id);

    List<ReserveDTO> getAllByDate(String date, Integer id);
}
