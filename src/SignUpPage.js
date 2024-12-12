import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        // 회원가입 처리 후 로그인 페이지로 이동 (간단하게 처리)
        if (username && password) {
            navigate('/');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/">Login</a></p>
        </div>
    );
}

export default SignUpPage;
