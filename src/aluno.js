import conexao from "./banco.js";

// Função que lê a tabela de alunos do BD
function ler(res) {
// Criando o CRUD
const sql = "SELECT * FROM alunos ORDER BY nome";


// conectando ao BD
conexao.query(sql, (erro, resultados) => {
    if(resultados.length === 0) {
        res.status(204).end(); //204 = Sem conteúdo. O método .end() para qualquer comunicação.
        return; // equivalente ao die()
    } 
    if(erro) {
        res.status(400).json(erro.code); // 400 BAD Request - comunicação não entendida pelo servidor / requisição inválida.
    } else {
        res.status(200).json(resultados); //deu certo, exibir os resultados
    }
}) //query equivale ao  execute do php
}

// Inserindo alunos

function inserir(aluno, res) {
    // Estamos iniciando o comando de inserção de dados no banco utilizando um caracter curinga do MySQL2 "SET ?" que recebe os dados e atribui na ordem sem a necessidade de especificar as colunas. Proteção contra injection e tratamento de strings 
    const sql = "INSERT INTO alunos SET ?";

    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code); //400 - requisição inválida e informa o código de erro.
        } else {
            res.status(201).json({"status": "Aluno inserido"}); // 201- criado e apresenta a mensagem do Aluno inserido!. 
            //res.status(201).end();
        }
    });
}

function lerUm(id, res) {
    const sql = "SELECT * FROM alunos WHERE id = ?";

  conexao.query(sql, id, (erro, resultados) => {
    if(resultados.length === 0){
        res.status(204).end();
        return;
    }
    // if erro ou resultado
    if(erro){
        res.status(400).json(erro.code);
    } else {
        res.status(200).json(resultados[0]);
    }
  })
}

// Atualizar aluno
// Essa função vai receber um id, os dados do aluno, e res.
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    // Aqui a ordem é importante, para passar mais de um parâmetro usamos o array. Dentro dele a ordem importa, pois precisa corresponder ao SQL acima.
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
            // res.status(200).json({"status" : "Atualizado com sucesso!"});

            // spread operator (operador de "espalhamento" de objetos) pega todos os itens e adiciona dentro do mesmo objeto
            res.status(200).json({...aluno, id});
        }
    });
}

// Função para excluir alunos
function excluir(id, res) {
    const sql = "DELETE FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({"status" : "aluno excluído", id});
        }
    });
}




export { ler, inserir, lerUm, atualizar, excluir };


