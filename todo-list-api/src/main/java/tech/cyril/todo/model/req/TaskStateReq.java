package tech.cyril.todo.model.req;

import lombok.Data;

@Data
public class TaskStateReq {
    private Long id;
    private Boolean done;
}
