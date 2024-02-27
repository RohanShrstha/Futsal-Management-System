package fms.projectII.controller.futsal;

import com.fasterxml.jackson.databind.ObjectMapper;
import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.futsal.FutsalDTO;
import fms.projectII.dtos.images.ImagesDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.images.Images;
import fms.projectII.service.futsal.FutsalService;
import fms.projectII.service.images.ImagesServiceImpl;
import fms.projectII.service.users.UsersService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/futsal")
public class FutsalController extends BaseController {
    private FutsalService futsalService;
    @Autowired
    private UsersService userService;
    @Autowired
    ImagesServiceImpl imagesService;


    public FutsalController(FutsalService futsalService) {this.futsalService = futsalService;}

//    @PostMapping
//    public ResponseEntity<?> create(@ModelAttribute FutsalDTO futsalDTO) throws IOException {
//        Integer userId = futsalDTO.getUser_id();
//
////        System.out.println(futsalDTO.getPhotos());
//
//        FutsalDTO dto = futsalService.create(futsalDTO);
//
//        userService.updateFutsalId(userId, dto.getFutsal_id());
//
//        return ResponseEntity.ok(
//                successResponse(customMessageSource.get(
//                        "crud.create", customMessageSource.get("futsal")),futsalDTO)
//        );
//    }

    @PostMapping
    public ResponseEntity<?> create( @RequestParam("data") String data,
                                     @RequestParam(value = "photos", required = false) List<MultipartFile> photos) throws IOException {
        System.out.println(data);
        ObjectMapper objectMapper = new ObjectMapper();
        FutsalDTO futsalDTO = objectMapper.readValue(data, FutsalDTO.class);
        Integer userId = futsalDTO.getUser_id();
//        List<ImagesDTO> imagesDTOList = new ArrayList<>();
//        for (MultipartFile multipartFile: photos
//             ) {
//            ImagesDTO dto = imagesService.create(multipartFile);
//            imagesDTOList.add(dto);
//        }
//        ModelMapper modelMapper = new ModelMapper();
//        List<Images> images = imagesDTOList.stream().map(x->modelMapper.map(x, Images.class)).collect(Collectors.toList());
//        futsalDTO.setImagesList(images);

        FutsalDTO dto = futsalService.create(futsalDTO);
        userService.updateFutsalId(userId, dto.getFutsal_id());

        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("futsal")),null)
        );
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<FutsalDTO> dtos = futsalService.getAll();
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("futsal")),dtos)
        );
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id){
        FutsalDTO dto = futsalService.getById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get", customMessageSource.get("futsal")),dto)
        );
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody FutsalDTO dto) throws IOException {
        dto = futsalService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("futsal")),dto)
        );
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id){
        futsalService.deleteById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.delete", customMessageSource.get("futsal")),null)
        );
    }
}