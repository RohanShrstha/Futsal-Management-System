package fms.projectII.service.images;

import fms.projectII.helper.DocumentValidator;
import fms.projectII.config.CustomMessageSource;
import fms.projectII.dtos.images.ImagesDTO;
import fms.projectII.entity.images.Images;
import fms.projectII.repo.images.ImagesRepo;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ImagesServiceImpl implements ImagesService {
    private ImagesRepo imagesRepo;
    private CustomMessageSource customMessageSource;
    private ModelMapper mapper;

    private final String root = System.getProperty("user.home");
    private final String directoryPath;
    private final String dirPath;

    public ImagesServiceImpl(ImagesRepo imagesRepo, CustomMessageSource customMessageSource, ModelMapper mapper) {
        this.imagesRepo = imagesRepo;
        this.customMessageSource = customMessageSource;
        this.mapper = mapper;
        this.dirPath = "fms" + File.separator + "uploads";
        this.directoryPath = root + File.separator + dirPath;
    }

    @Override
    public ImagesDTO create(MultipartFile multipartFile) throws IOException {
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String uuid = UUID.randomUUID().toString();

        if(multipartFile != null && !multipartFile.isEmpty()) {
            DocumentValidator.isDocumentPicture(multipartFile.getOriginalFilename());
            String temp = uuid + "_" + multipartFile.getOriginalFilename();
            String fileName = StringUtils.cleanPath(temp);
            fileName = fileName.replace(" ", "_");
            Path filePath = Paths.get(directoryPath + File.separator + fileName);
            InputStream stream = multipartFile.getInputStream();
            Files.copy(stream, filePath, StandardCopyOption.REPLACE_EXISTING);
            Images images = Images.builder()
                    .name(fileName)
                    .path(dirPath + File.separator + fileName)
                    .build();
            images = imagesRepo.save(images);
            stream.close();
            return mapper.map(images, ImagesDTO.class);
        }
        else {
            throw new RuntimeException(customMessageSource.get("no.images"));
        }
    }

    @Override
    public List<ImagesDTO> createAll(List<MultipartFile> files) throws IOException {
        return files.stream().map(x-> {
            try {
                return create(x);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

    @Override
    public List<ImagesDTO> getAll() {
        return null;
    }

    @Override
    public List<ImagesDTO> getAllByCurrentUser() {
        return null;
    }

    @Override
    public ImagesDTO getById(Integer id) {
        return mapper.map((imagesRepo.findById(id).orElseThrow(() ->
                new RuntimeException(
                        customMessageSource.get("error.not.found.get",customMessageSource.get("images")
                        )
                )
        )), ImagesDTO.class);
    }

    @Override
    public ImagesDTO update(ImagesDTO pictureDTO) throws IOException {
        imagesRepo.findById(pictureDTO.getId()).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("images"))
                )
        );

        if (pictureDTO.getFile() != null && !pictureDTO.getFile().isEmpty()) {

            DocumentValidator.isDocumentPicture(pictureDTO.getFile().getOriginalFilename());
            String fileName = pictureDTO.getName();
            Path filePath = Paths.get(directoryPath + File.separator + fileName);
            Files.copy(pictureDTO.getFile().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            Images picture = Images.builder()
                    .id(pictureDTO.getId())
                    .name(fileName)
                    .path(dirPath + File.separator + fileName)
                    .build();
            picture = imagesRepo.save(picture);
            return mapper.map(picture, ImagesDTO.class);
        }
        else {
            throw new RuntimeException(customMessageSource.get("no.images"));
        }
    }

    @Override
    public void deleteById(Integer id) {
        Images picture = imagesRepo.findById(id).orElseThrow(() ->
                new RuntimeException(customMessageSource.get("error.not.found",
                        customMessageSource.get("images"))
                )
        );
        try{
            Files.deleteIfExists(Paths.get(directoryPath + File.separator + picture.getName()));
        }catch (Exception e)
        {
            throw new RuntimeException(
                    customMessageSource.get("error.cannot.delete",customMessageSource.get("images")
                    )
            );
        }
    }


    public List<Images> updateAll(List<Images> imagesListFromDb, List<Images> imagesList, List<MultipartFile> multipartFile) {

        List<Images> removeImages = new ArrayList<>();
        if(imagesList != null){
            imagesListFromDb.stream().forEach(
                    imageFromDb -> {
                        if(imagesList.stream().anyMatch(img -> img.getId() != imageFromDb.getId())){
                            //didnt match so delete
                            removeImages.add(imageFromDb);
                            this.deleteById(imageFromDb.getId());
                        }
                    }
            );
        }
        else{
            for (Images i: imagesListFromDb) {
                removeImages.add(i);
                this.deleteById(i.getId());
            }
        }

        List<ImagesDTO> imagesDTOList = null;

        if(multipartFile != null){
            try {
                imagesDTOList = createAll(multipartFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        //new created images
        List<Images> iList = new ArrayList<>();
        if(imagesDTOList != null){
            iList = imagesDTOList.stream().map(x->mapper.map(x, Images.class)).collect(Collectors.toList());
        }

        if(iList.size() !=0)
        {
            imagesList.addAll(iList);
        }

        List<Images> result = imagesList.stream()
                .filter(a -> removeImages.stream().noneMatch(b -> b.getId() == a.getId()))
                .collect(Collectors.toList());
        return result;
    }

    private void deleteValueFromDb(Integer id){
        imagesRepo.deleteById(id);
    }
}
