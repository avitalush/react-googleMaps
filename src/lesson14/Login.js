import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        navigate('/home')
    }

    return <form onSubmit={handleSubmit}>
        <input defaultValue={"שם משתמש"}/>
        <br/>
        <input defaultValue={"סיסמא"}/>
        <br/>
        <button>Login</button>
    </ form>

}