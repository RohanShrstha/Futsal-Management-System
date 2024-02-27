package fms.projectII.helper;

import lombok.extern.slf4j.Slf4j;
import java.util.Arrays;
import java.util.List;

@Slf4j
public class DocumentValidator {

    public static Boolean isDocumentPicture(String fileName){
        List<String> photoFileExtensionList = Arrays.asList("JPEG", "JFIF", "JPG", "Exif", "TIFF", "GIF", "BMP",
                "PNG", "WebP", "HEIF", "AVIF", "SVG", "CGM", "PSD", "PDF", "EPS", "AI", "INDD", "RAW");
        String fileExtension = getExtension(fileName);
        if (!photoFileExtensionList.stream().filter(x-> x.equalsIgnoreCase(fileExtension)).findAny().isPresent()){
            log.error("Invalid file extension was uploaded");
            throw new RuntimeException("File Extension is not valid");
        }
        return true;
    }

    public static String getExtension(String fileName) {
        String name = fileName;
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return null;
        }
        return name.substring(lastIndexOf + 1);
    }
}
