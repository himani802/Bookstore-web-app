import "./Frontpage.css";
import { useNavigate } from "react-router-dom";


export default function Frontpage() {
    const navigate = useNavigate();

    return (
        <div className="front">
            <h1>Literary Lanes</h1>
            <div className="box">
                <button onClick={() => navigate('/admin')}>Admin</button>
                <button onClick={() => navigate('/UserLogin')}>User</button>

            </div>
        </div>
    );
}