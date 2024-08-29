import express from "express";
import path, { resolve } from "path";


import { generateTable, parseOperation } from '@lusc/truth-table';


const expression = 'A ∨ (B ∧ C)'; 

const truthTable = generateTable(expression);


console.log('Columns:', truthTable.columns);
console.log('Rows:', truthTable.rows);


console.log('AST:', truthTable.ast);

const app = express();
const port = 3000;



const htmlPath = resolve("index.html");

app.use(express.static(resolve("public")));

app.get("/", (req, res) => {
    res.sendFile(htmlPath);
});

app.get('/api/truth-table', (req, res) => {
    const { expression } = req.query;
    if (!expression) {
        return res.status(400).json({ error: 'Expression is required' });
    }

    try {
        const truthTable = generateTable(expression);
        res.json(truthTable);
    } catch (error) {
        res.status(500).json({ error: 'Error generating truth table' });
    }
});


app.listen(port, () => {
    console.log("Server is running on port", port);
});
