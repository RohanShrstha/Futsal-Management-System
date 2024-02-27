package fms.projectII.service.images;


import fms.projectII.dtos.images.ImagesDTO;
import fms.projectII.entity.images.Images;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImagesService {
    ImagesDTO create(MultipartFile multipartFile) throws IOException;

    List<ImagesDTO> createAll(List<MultipartFile> files) throws IOException;

    List<ImagesDTO> getAll();

    List<ImagesDTO> getAllByCurrentUser();

    ImagesDTO getById(Integer id);

    ImagesDTO update(ImagesDTO imagesDTO) throws IOException;

    void deleteById(Integer id);

    List<Images> updateAll(List<Images> imagesListFromDb, List<Images> imagesList, List<MultipartFile> multipartFile);

}
