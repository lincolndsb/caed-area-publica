const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = '4ca562f482badb5c761e47e2306e253dfd9b9177c6acce68b60582c7f339aabe';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
}

app.get('/linha-do-tempo/:parceria', authenticateToken, async (req, res) => {
    const partner = req.params.parceria;
    const dataFilePath = `https://prototipos.caeddigital.net/assets/js/${partner}/json/linhadotempo.json`;
    try {
        const response = await axios.get(dataFilePath);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os itens.');
    }
});

app.get('/matrizes/:parceria', authenticateToken, async (req, res) => {
    const partner = req.params.parceria;
    const dataFilePath = `https://prototipos.caeddigital.net/assets/js/${partner}/json/matrizes.json`;
    try {
        const response = await axios.get(dataFilePath);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os itens.');
    }
});

app.get('/padroes/:parceria', authenticateToken, async (req, res) => {
    const partner = req.params.parceria;
    const dataFilePath = `https://prototipos.caeddigital.net/assets/js/${partner}/json/padroes.json`;
    try {
        const response = await axios.get(dataFilePath);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os itens.');
    }
});

app.get('/recursos/:parceria', authenticateToken, async (req, res) => {
    const partner = req.params.parceria;
    const dataFilePath = `https://prototipos.caeddigital.net/assets/js/${partner}/json/recursos.json`;
    try {
        const response = await axios.get(dataFilePath);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os itens.');
    }
});

app.get('/colecoes/:parceria', authenticateToken, async (req, res) => {
    const partner = req.params.parceria;
    const dataFilePath = `https://prototipos.caeddigital.net/assets/js/${partner}/json/colecoes.json`;
    try {
        const response = await axios.get(dataFilePath);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os itens.');
    }
});

app.get('/retorna-json', authenticateToken, async (req, res) => {
    const dataFilePath = req.query.url;
    try {
        const response = await axios.get(dataFilePath);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os itens.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
