package fms.projectII.dtos.futsal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import fms.projectII.dtos.users.UsersDTO;
import fms.projectII.entity.futsal.Futsal;
import fms.projectII.entity.images.Images;
import fms.projectII.entity.users.Users;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)

public class FutsalDTO {

//    private Users users;

    private Integer futsal_id;

    private String futsal_name;

    private String futsal_location;

    private String futsal_contact;

    private String futsal_email;

    private Integer futsal_price;

    private Integer futsal_wprice;

    private String futsal_openingTime;

    private String futsal_closingTime;

    private String futsal_description;

    private String futsal_features;

    private String futsal_latitude;

    private String futsal_longitude;

    private String futsal_status;

    private LocalDateTime futsal_time;

    private List<MultipartFile> photos;

    private List<Images> imagesList;

    private Integer user_id;

    public Futsal toEntity(FutsalDTO futsalDTO){
        Futsal futsal =Futsal.builder()
                .futsal_id(futsalDTO.getFutsal_id())
                .futsalName(futsalDTO.getFutsal_name())
                .futsal_location(futsalDTO.getFutsal_location())
                .futsal_contact(futsalDTO.getFutsal_contact())
                .futsal_email(futsalDTO.getFutsal_email())
                .futsal_openingTime(futsalDTO.getFutsal_openingTime())
                .futsal_closingTime(futsalDTO.getFutsal_closingTime())
                .futsal_price(futsalDTO.getFutsal_price())
                .futsal_wprice(futsalDTO.getFutsal_wprice())
                .futsal_description(futsalDTO.getFutsal_description())
                .futsal_features(futsalDTO.getFutsal_features())
                .futsal_longitude(futsalDTO.getFutsal_longitude())
                .futsal_latitude(futsalDTO.getFutsal_latitude())
                .futsal_status(futsalDTO.getFutsal_status())
                .futsal_time(futsalDTO.getFutsal_time())
//                .users(new UsersDTO().toEntity(futsalDTO.getUsersDTO()))
                .build();
        return futsal;
    }

    public FutsalDTO toDto(Futsal futsal){
        FutsalDTO futsalDTO =FutsalDTO.builder()
                .futsal_id(futsal.getFutsal_id())
                .futsal_name(futsal.getFutsalName())
                .futsal_location(futsal.getFutsal_location())
                .futsal_contact(futsal.getFutsal_contact())
                .futsal_email(futsal.getFutsal_email())
                .futsal_openingTime(futsal.getFutsal_openingTime())
                .futsal_closingTime(futsal.getFutsal_closingTime())
                .futsal_price(futsal.getFutsal_price())
                .futsal_wprice(futsal.getFutsal_wprice())
                .futsal_description(futsal.getFutsal_description())
                .futsal_features(futsal.getFutsal_features())
                .futsal_longitude(futsal.getFutsal_longitude())
                .futsal_latitude(futsal.getFutsal_latitude())
                .futsal_status(futsal.getFutsal_status())
                .futsal_time(futsal.getFutsal_time())
//                .usersDTO(new UsersDTO().toDto(futsal.getUsers()))
                .build();
        return futsalDTO;
    }
}
