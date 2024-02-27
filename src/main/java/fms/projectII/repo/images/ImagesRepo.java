package fms.projectII.repo.images;

import fms.projectII.entity.images.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagesRepo extends JpaRepository<Images, Integer> {
}
