package tech.cyril.todo.controller;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import tech.cyril.todo.constance.ResultCode;
import tech.cyril.todo.model.Task;
import tech.cyril.todo.model.req.TaskStateReq;
import tech.cyril.todo.model.resp.Result;
import tech.cyril.todo.service.TaskService;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Resource
    private TaskService taskService;

    @GetMapping("/all")
    public Result<List<Task>> getAll(@RequestParam(value = "include_deleted", required = false, defaultValue = "false") Boolean includeDeleted){
        return Result.ok(taskService.getAll(includeDeleted));
    }

    @PostMapping("/add")
    public Result<Long> add(@RequestBody Task task){
        var id = taskService.insert(task);
        return Result.ok(id);
    }

    @PostMapping("/change")
    public Result<Objects> change(@RequestBody TaskStateReq taskStateReq){
        var target = taskService.get(taskStateReq.getId());
        if(target.isPresent()){
            var task = target.get();
            task.setDone(taskStateReq.getDone());
            taskService.updateById(task);
            return Result.ok();
        } else {
            return Result.failed(ResultCode.DB_ID_NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    public Result<Objects> delete(@RequestParam Long id){
        taskService.deleteById(id);
        return Result.ok();
    }
}
