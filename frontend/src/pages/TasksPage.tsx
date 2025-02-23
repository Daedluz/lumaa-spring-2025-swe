import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Task, { TaskProps } from '../components/task'

export default function TasksPage({ setLogin }: any) {
    const [tasks, setTasks] = useState([])
    const [create, setCreate] = useState(false)
    const [props, setProps] = useState<TaskProps>({
        id: 0,
        title: '',
        description: '',
        iscomplete: false,
        userid: 1
    })
    
    const fetchTasks = async () => {
        try{
        const data = await axios.get('http://localhost:8080/tasks', {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            setTasks(data.data)
            console.log(data.data)
        }
        catch (err) {
            console.error(err)
        }
    }



    useEffect(() => {
        fetchTasks()
    }, [])

    const handleCreate = async () => {
        try {
            const data = await axios.post('http://localhost:8080/tasks', props, {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            console.log(data)
            fetchTasks()
            setCreate(false)
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleLogout = () => {
        console.log("Logging out")
        localStorage.removeItem('token')
        setLogin(false)
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setCreate(true)}>Create Task</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {create ? (
                        <tr>
                            <td><input type="text" placeholder="Title" onChange={(e) => setProps({...props, title: e.target.value})} /></td>
                            <td><input type="text" placeholder="Description" onChange={(e) => setProps({...props, description: e.target.value})} /></td>
                            <td><input type="checkbox" onChange={(e) => setProps({...props, iscomplete: e.target.checked})} /></td>
                            <td><input type="number" placeholder="User ID" onChange={(e) => setProps({...props, userid: parseInt(e.target.value)})} /></td>
                            <td><button onClick={handleCreate}>Create</button></td>
                        </tr>) : <></>
                    }
                    {tasks.map((prop: TaskProps) => (<Task 
                            id={prop.id} 
                            title= {prop.title}
                            description={prop.description}
                            iscomplete={prop.iscomplete}
                            userid={prop.userid}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
