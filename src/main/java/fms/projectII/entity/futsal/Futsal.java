package fms.projectII.entity.futsal;

import com.fasterxml.jackson.annotation.JsonFormat;
import fms.projectII.entity.images.Images;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.awt.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "futsal")
public class Futsal {
    @Id
    @SequenceGenerator(name = "futsal_sequence", sequenceName = "futsal_sequence", allocationSize = 1)
    @GeneratedValue(generator = "futsal_sequence", strategy = GenerationType.SEQUENCE)
    private Integer futsal_id;

    @Column(name = "futsal_name", length = 100)
    private String futsalName;

    @Column(name = "futsal_location", length = 100)
    private String futsal_location;

    @Column(name = "futsal_contact", length = 100)
    private String futsal_contact;

    @Column(name = "futsal_email", length = 100)
    private String futsal_email;

    @Column(name = "futsal_openingTime", length = 10)
    private String futsal_openingTime;

    @Column(name = "futsal_closingTime", length = 10)
    private String futsal_closingTime;

    @Column(name = "futsal_price", length = 100)
    private Integer futsal_price;

    @Column(name = "futsal_wprice", length = 100)
    private Integer futsal_wprice;

    @Column(name = "futsal_description", length = 1000)
    private String futsal_description;

    @Column(name = "futsal_features", length = 5000)
    private String futsal_features;

    @Column(name = "futsal_status", length = 100)
    private String futsal_status;

    @Column(name = "futsal_latitude", length = 100)
    private String futsal_latitude;

    @Column(name = "futsal_longitude", length = 100)
    private String futsal_longitude;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="futsal_time")
    private LocalDateTime futsal_time;

//    @OneToMany
//    private List<Images> imagesList;
    public Futsal(Integer futsal_id) {
        this.futsal_id = futsal_id;
    }
}
