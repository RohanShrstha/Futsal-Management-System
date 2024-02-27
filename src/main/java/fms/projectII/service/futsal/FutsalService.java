package fms.projectII.service.futsal;

import fms.projectII.dtos.futsal.FutsalDTO;
import fms.projectII.entity.futsal.Futsal;

import java.util.List;

public interface FutsalService {
    public FutsalDTO create(FutsalDTO dto);

    public List<FutsalDTO> getAll();

    public FutsalDTO getById(Integer id);

    public FutsalDTO update(FutsalDTO dto);

    public void deleteById(Integer id);

}
