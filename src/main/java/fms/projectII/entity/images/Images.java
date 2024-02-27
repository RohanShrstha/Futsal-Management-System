package fms.projectII.entity.images;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Images {
    @Id
    @SequenceGenerator(sequenceName = "images_seq", name = "images_seq", allocationSize = 1)
    @GeneratedValue(generator = "images_seq", strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;
    private String path;

    public Images(Integer id) {
        this.id = id;
    }
}
