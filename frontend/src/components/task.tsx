import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Button = styled.button`
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
`

export interface TaskProps {
    id: number,
    title: string,
    description: string,
    iscomplete: boolean,
    userid: number
}

export default function Task({ id, title, description, iscomplete, userid }: TaskProps) {
    const [deleted, setDeleted] = useState(false)
    const [props, setProps] = useState<TaskProps>({
        id: id,
        title: title,
        description: description,
        iscomplete: iscomplete,
        userid: userid
    })
    const [edit, setEdit] = useState(false)

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/tasks/${id}`, {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            setDeleted(true)
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleEdit = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/tasks/${id}`, props, {
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
            })
            console.log(res)
            setEdit(false)
            console.log(props)
        }
        catch (err) {
            console.error(err)
            console.log(props)
        }
    }

    return deleted ? <></> : (edit ? 
        (<tr> 
            <td><input type="text" value={props.title} onChange={(e) => setProps({...props, title: e.target.value})}/></td>
            <td><input type="text" value={props.description} onChange={(e) => setProps({...props, description: e.target.value})}/></td>
            <td><input type="checkbox" checked={props.iscomplete} onChange={(e) => setProps({...props, iscomplete: e.target.checked}) }/></td>
            <td><input type="number" value={props.userid} onChange={(e) => setProps({...props, userid: parseInt(e.target.value)})}/></td>
            <Button onClick={handleEdit}>Save</Button>
        </tr>)
        :
        (<tr>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{props.iscomplete ? "Yes" : "No"}</td>
            <td>{String(props.userid)}</td>
            <Button onClick={() => setEdit(true)}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </tr>))
}
