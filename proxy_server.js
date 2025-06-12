const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');






// هذا يخلي السيرفر يعرض الملفات الثابتة مثل index.html
app.use(express.static(__dirname));

// هذا يرجع ملف index.html عند الدخول على /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors());

app.get('/api', async (req, res) => {
  const unique = req.query.unique;
  if (!unique) return res.status(400).json({ error: 'Missing unique parameter' });

  try {
    const response = await fetch(`http://176.241.95.201:8092/id?unique=${unique}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('admin:241067890').toString('base64')
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});



app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});