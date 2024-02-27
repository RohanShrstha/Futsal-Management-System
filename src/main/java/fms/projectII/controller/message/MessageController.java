package fms.projectII.controller.message;

import fms.projectII.abstracts.BaseController;
import fms.projectII.dtos.message.MessageDTO;
import fms.projectII.service.message.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController extends BaseController {
    private MessageService messageService;

    public MessageController(MessageService messageService) {this.messageService = messageService;}

    @PostMapping
    public ResponseEntity<?> create(@RequestBody MessageDTO messageDTO) throws IOException {
        messageDTO = messageService.create(messageDTO);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.create", customMessageSource.get("message")),messageDTO)
        );
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<MessageDTO> dtos = messageService.getAll();
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get.all", customMessageSource.get("message")),dtos)
        );
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id){
        MessageDTO dto = messageService.getById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.get", customMessageSource.get("message")),dto)
        );
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody MessageDTO dto) throws IOException {
        dto = messageService.update(dto);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.update", customMessageSource.get("message")),dto)
        );
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id){
        messageService.deleteById(id);
        return ResponseEntity.ok(
                successResponse(customMessageSource.get(
                        "crud.delete", customMessageSource.get("message")),null)
        );
    }
}
