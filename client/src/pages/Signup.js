import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [roomno,setRoomno] = useState('')
    const [password,setPassword] = useState('')
    const {signup, error, isloading}= useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(name,email,roomno,password)
    } 
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Room Number:</label>
            <input 
                type="text"
                onChange={(e) => setRoomno(e.target.value)}
                value={roomno}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isloading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup