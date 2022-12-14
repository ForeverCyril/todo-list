package tech.cyril.todo.service.impl;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import tech.cyril.todo.model.Task;
import tech.cyril.todo.repository.TaskRepository;
import tech.cyril.todo.service.TaskService;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    @Resource
    private TaskRepository taskRepository;

    @Override
    public List<Task> getAll(boolean include_delete) {
        return include_delete?taskRepository.findAll():taskRepository.findByDeletedFalse();
    }

    @Override
    public Optional<Task> get(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Long insert(Task task) {
        task.setId(null);
        var res = taskRepository.save(task);
        return res.getId();
    }

    @Override
    public void updateById(Task task) {
        taskRepository.save(task);
    }

    @Override
    public void deleteById(Long id) {
        var res = taskRepository.findById(id);
        if(res.isEmpty()){
            //TODO: throw exception
            return;
        }
        var task = res.get();
        if(task.getDeleted()){
            //TODO: throw exception
            return;
        }
        task.setDeleted(true);
        taskRepository.save(task);
    }
}
