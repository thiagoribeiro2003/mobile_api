import express  from "express";
import cors from "cors";
import {ler, inserir, lerUm, atualizar, excluir} from "./src/aluno.js";

const app = express();
const porta = process.env.PORT || 3000;

//  Configurando requisições de diferentes origens
app.use(cors());

// Configurando suporte a JSON
app.use(express.json()); // essa linha dentro do express é o que dará suporte a JSON
// Configurando suporte a dados de formulários (input)
app.use(express.urlencoded({extended : true}));
//configurando ROTAS

// Rota (endpoint) para a raiz da api
app.get('/', (req, res) => {
    res.send('Projeto Mobile Api');
});

// Rota (endpoint para exibir todos os alunos)
app.get('/perfil', (req, res) => {
   // res.send(`Todos alunos`);
   ler(res);
});

// Rota (endpoint) para exibir um único aluno
app.get(`/perfil/:id`, (req, res) => {
    // res.send(`Exibindo dados de um aluno`);
    const id = req.params.id; //params é função nativa do mysql 2 - pegue todos os parâmetros e busque o id
    lerUm(id, res);
});

// Rota (endpoint) para INSERIR alunos
app.post('/perfil', (req, res) => {
    // res.send(`INSERINDO perfil`);
    const novoAluno = req.body;
    inserir(novoAluno, res);
});

// Rota para atualizar TODOS os dados do aluno
app.put('/perfil/:id', (req, res) => {
    res.send(`ATUALIZANDO TODOS os dados dos perfil`);
});

app.patch('/perfil/:id', (req, res) => {
    // res.send(`ATUALIZA ALGUNS/todos os dados de um aluno`);

    // capturar id
    const id = parseInt(req.params.id);
    // dados do aluno
    const aluno = req.body;
    atualizar(id, aluno, res);
});

// Rota (endpoint) para EXCLUIR aluno
app.delete('/perfil/:id', (req, res) => {
    // res.send(`EXCLUI aluno.`);
    const id = parseInt(req.params.id);
    excluir(id, res);
});

// Configurando o servidor 
app.listen(porta, () => {
    console.log('Servidor Express rodando...')
})