const express = require('express');
const app = express();
const PORT = 3000;

// 允许所有跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header');
  next();
});

// Simple Request（GET）
app.get('/simple', (req, res) => {
  res.send('Simple Request Response');
});

// Complex Request（PUT + custom headers）
app.put('/complex', (req, res) => {
  res.send('Complex Request Response');
});

// Pre-Flight Request（OPTIONS）
app.options('/complex', (req, res) => {
  res.sendStatus(200); // 预检请求直接返回200
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
