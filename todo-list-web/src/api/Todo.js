function checkResult(resp){
    if(resp.success === false){
        throw resp;
    }
}

async function fetch_json(input, init){
    init = {
        ...init,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    let resp = await fetch(input, init);
    return await resp.json();
}

export function create(url = ""){
    return {
        base_url: url,

        /**
         * 获取任务列表
         * @returns {Promise<*>} 任务列表
         */
        getAll: async function (){
            const resp = await fetch_json(`${this.base_url}/api/task/all`);
            checkResult(resp);
            const list = resp.data;
            return list.map(task=>{
                return {...task, syncFinish: true};
            });
        },

        /**
         * 创建任务
         * @param text 任务文字
         * @param time 任务创建时间
         * @returns {Promise<*>} 任务ID
         */
        addTask: async function (text, time){
            if(time === undefined){
                time = new Date();
            }
            const resp = await fetch_json(`${this.base_url}/api/task/add`, {
                method: 'POST',
                body: JSON.stringify({text: text, done: false, createTime: time}),
            })
            return resp.data;
        },

        /**
         * 删除任务
         * @param id 任务id
         * @returns {Promise<void>}
         */
        delTask: async function (id){
            const resp = await fetch_json(`${this.base_url}/api/task/delete?id=${id}`, {
                method: "DELETE",
            });
            checkResult(resp);
        },

        /**
         * 更新任务状态
         * @param id 任务id
         * @param done 新状态
         * @returns {Promise<void>}
         */
        updateTask: async function(id, done){
            const resp = await fetch_json(`${this.base_url}/api/task/change`, {
                method: "POST",
                body: JSON.stringify({id: id,done: done }),
            });
            checkResult(resp);
        }
    }
}