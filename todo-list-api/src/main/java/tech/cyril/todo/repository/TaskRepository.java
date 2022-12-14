package tech.cyril.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.cyril.todo.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByDeletedFalse();
}
