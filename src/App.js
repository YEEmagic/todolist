import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import TodoListPage from './TodoListPage';

function App() {
    return (
        <Router>
            <div>
                <h1>나만의 Todo List</h1>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/todos" element={<TodoListPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
