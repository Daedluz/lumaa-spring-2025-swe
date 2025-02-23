import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Input = styled.input`
    margin: 10px;
    padding: 8px;
`

const Err = styled.p`
    color: red;
`

const Button = styled.button`
    margin: 10px;
`

export default function Login({ setLogin }: any) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.UIEvent) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:8080/auth/login', { 
                    username,
                    password
                }
            )

            const data = res.data
            console.log(data)

            if (res.status !== 200) {
                setError("Incorrect username or password")
            } 
            else {
                setError('')
                console.log("Login successful")
                localStorage.setItem('token', data.token)
                setLogin(true)
            }
        } 
        catch (err) {
            console.error(err)
            setError("Incorrect username or password")
        }
    }

    const handleRegister = async (e: React.UIEvent) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:8080/auth/register', { 
                    username,
                    password
                }
            )

            const data = res.data

            if (res.status !== 201) {
                setError("Username already exists")
            } 
            else {
                setError('Account created, please login')
                setUsername('')
                setPassword('')
                localStorage.setItem('token', data.token)
            }
        } 
        catch (err) {
            console.error(err)
            setError("Username already exists")
        }
    }

    return (
        <>
            <div>
                <h1>Login/Register</h1>
                <Form >
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form>
                <Err>{error}</Err>
            </div>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
        </>
    )
}
