import {Box, Button, Container, LinearProgress, List, Paper, TextField, Typography} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {useEffect, useRef, useState} from "react";
import TodoList from "./TodoList";

import {create as createTodo} from "../api/Todo";
import {uuidV4, isBlankStr}from "../utils/utils";

function errorHandle(err){
    //TODO: add error handler
    console.log(err);
}

export default function Todo(){
    const [input, setInput] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [loadingFinish, setLoadingFinish] = useState(false)

    const curList = useRef();
    curList.current = taskList;

    const todo = createTodo();

    // fetch task list from server
    useEffect(()=>{
        (async function (){
            let list = await todo.getAll();
            setTaskList(list);
            setLoadingFinish(true);
        }().catch(errorHandle))
    }, [])

    function onTaskAdd(){
        if(isBlankStr(input)){
            return;
        }

        (async function (){
            const cur_time = new Date();
            const uuid = uuidV4();

            setTaskList([...taskList, {
                text: input, done: false, createTime: cur_time, id: uuid,  syncFinish: false
            }]);

            setInput('');

            let real_id = await todo.addTask(input, cur_time);
            let mod = [...curList.current];
            for(const i = mod.length-1; i>=0; i--){
                let task = mod[i];
                if(task.id === uuid){
                    mod[i] = {...task, syncFinish: true, id: real_id};
                    break;
                }
            }
            setTaskList(mod);
        }().catch(errorHandle));
    }

    function onTaskDelete(index){
        (async function(){
            let list = [...taskList];
            const id = list[index].id;

            // mark the task that want to delete
            const uuid = uuidV4();
            list[index].id = uuid;
            list[index].syncFinish = false;
            setTaskList(list);
            await todo.delTask(id);

            // delete the task from list
            setTaskList(curList.current.filter(task=>task.id !== uuid));
        }().catch(errorHandle));
    }

    function onTaskStateChange(index){
        (async function(){
            let list = [...taskList];
            let target = list[index];
            list[index] = {...target, done: !target.done, syncFinish: false};
            setTaskList(list);

            await todo.updateTask(target.id, !target.done);

            setTaskList(curList.current.map(task=>{
                if(task.id === task.id){
                    return{...task, syncFinish: true}
                }
                return task;
            }));
        }().catch(errorHandle));
    }

    return (
        <Container maxWidth='xs'>
            <Paper sx={{padding:2, marginTop:2}}>
                <Box hidden={loadingFinish} sx={{position:"sticky", top: 2}}>
                    <LinearProgress color="success" variant="indeterminate"/>
                </Box>
                <Typography variant={'h3'} mt={2} sx={{textAlign:'center'}}>Todos</Typography>
                <Paper display='flex' sx={{display:'flex', mt:2, position:"sticky", top: 10, zIndex:1}}>
                    <TextField sx={{flexGrow:'1', mr:2}} value={input} onChange={(e)=>setInput(e.target.value)} ></TextField>
                    <Button variant='contained' sx={{padding:1}} startIcon={<PostAddIcon/>} onClick={onTaskAdd}>添加</Button>
                </Paper>
                <List sx={{mt:3}}>
                    <TodoList list={taskList} onTaskDelete={onTaskDelete} onTaskStateChange={onTaskStateChange}/>
                </List>
            </Paper>
        </Container>
    )
}