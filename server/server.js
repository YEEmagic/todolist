const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'users.json');

// 사용자 데이터 읽기
function getUsers() {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

// 사용자 데이터 저장
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// 회원가입 API
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists!' });
    }

    // 새로운 사용자 등록
    users.push({ username, password, todos: [] });
    saveUsers(users);

    return res.status(200).json({ message: 'User registered successfully' });
});

// 로그인 API
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful', username });
});
// 로그아웃 API
app.post('/logout', (req, res) => {
    return res.status(200).json({ message: 'Logout successful' });
});


// 투두 리스트 가져오기
app.get('/todos', (req, res) => {
    const { username } = req.query;
    const users = getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.todos);
});

// 투두 추가
app.post('/todos', (req, res) => {
    const { username, text } = req.body;
    const users = getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const newTodo = { id: user.todos.length + 1, text, completed: false };
    user.todos.push(newTodo);
    saveUsers(users);

    return res.status(201).json({ message: 'Todo added successfully', todo: newTodo });
});

// 투두 수정
app.put('/todos/:id', (req, res) => {
    const { username } = req.body;
    const { id } = req.params;
    const { text, completed } = req.body;

    const users = getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const todo = user.todos.find((t) => t.id == id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todo.text = text || todo.text;
    todo.completed = completed !== undefined ? completed : todo.completed;
    saveUsers(users);

    return res.status(200).json({ message: 'Todo updated successfully', todo });
});

// 투두 삭제
app.delete('/todos/:id', (req, res) => {
    const { username } = req.body;
    const { id } = req.params;

    const users = getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const index = user.todos.findIndex((t) => t.id == id);
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    user.todos.splice(index, 1);
    saveUsers(users);

    return res.status(200).json({ message: 'Todo deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
