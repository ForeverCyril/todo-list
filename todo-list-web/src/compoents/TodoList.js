import {
    Checkbox, CircularProgress, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";



export default function TodoList({list, onTaskDelete, onTaskStateChange}) {
    return(
        <List>
            {list.map((task, idx)=>(
                <ListItem key={idx} divider>
                    <ListItemButton disabled={!task.syncFinish} onClick={()=>onTaskStateChange(idx)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                checked={task.done}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={task.done ? <del>{task.text}</del>:task.text}
                            secondary={task.createTime.toLocaleString()}
                        />
                    </ListItemButton>
                    <ListItemSecondaryAction>
                        {
                            task.syncFinish?
                            <IconButton edge="end" aria-label="delete task" onClick={()=>onTaskDelete(idx)}>
                                <DeleteIcon/>
                            </IconButton>
                            :
                            <CircularProgress></CircularProgress>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    )
}