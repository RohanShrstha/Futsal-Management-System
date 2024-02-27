package fms.projectII.service.futsal;

import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.futsal.FutsalDTO;
import fms.projectII.dtos.images.ImagesDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.images.Images;
import fms.projectII.repo.futsal.FutsalRepo;
import fms.projectII.service.images.ImagesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@Slf4j

public class FutsalServiceImpl implements FutsalService{

    private FutsalRepo futsalRepo;

    private CustomMessageSource customMessageSource;

    private ImagesService imagesService;

    public FutsalServiceImpl(FutsalRepo futsalRepo, CustomMessageSource customMessageSource) {
        this.futsalRepo = futsalRepo;
        this.customMessageSource = customMessageSource;
    }

//    public FutsalDTO create(FutsalDTO dto) {
//        List<ImagesDTO> imagesDTOList = imagesService.createAll(dto.getMultipartFile());
//        List<Images> imagesList = imagesDTOList.stream().map(x->mapper.map(x, Images.class)).collect(Collectors.toList());
//        dto.setImagesList(imagesList);
//        dto =  super.create(dto);
//        inventoriesService.create(dto.getId());
//        return dto;
//    }

    @Override
    public FutsalDTO create(FutsalDTO dto) {
        Optional<Futsal> optionalUser1 = futsalRepo.findByFutsalName(dto.getFutsal_name());

        if (optionalUser1.isPresent()) {
            String errorMessage = customMessageSource.get("duplicate.name",
                    customMessageSource.get("futsal"));
            throw new RuntimeException(errorMessage);
        }
        Futsal f = new FutsalDTO().toEntity(dto);
//        f.setImagesList(dto.getImagesList());
        return new FutsalDTO().toDto(futsalRepo.save(f));
    }

    @Override
    public List<FutsalDTO> getAll() {
        return futsalRepo.findAll().parallelStream().map(x ->
                new FutsalDTO().toDto(x)).collect(Collectors.toList());
    }

    @Override
    public FutsalDTO getById(Integer id) {
        return new FutsalDTO().toDto(futsalRepo.findById(id).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found",
                                customMessageSource.get("futsal")
                        )
                )
        ));
    }

    @Override
    public FutsalDTO update(FutsalDTO dto) {
        futsalRepo.findById(dto.getFutsal_id()).orElseThrow(
                ()-> new RuntimeException(customMessageSource.get("error.not.found","futsal")));
        return new FutsalDTO().toDto(futsalRepo.save(new FutsalDTO().toEntity(dto)));
    }

    @Override
    public void deleteById(Integer id) {
        futsalRepo.findById(id).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("futsal"))
                )
        );
        futsalRepo.deleteById(id);
    }
}
