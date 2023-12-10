import { useNavigate } from 'react-router-dom'

export default function Logup() {
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        navigate('/home')
    }

    return <form onSubmit={handleSubmit}>
        <input defaultValue={"שם משתמש"}/>
        <br/>
        <input defaultValue={"שנת לידה"}/>
        <br/>
        <input defaultValue={"סיסמא"}/>
        <br/>
        <input defaultValue={"אמת סיסמא"}/>
        <br/>
        <button>Logup</button>
    </ form>

}