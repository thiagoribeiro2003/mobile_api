import mysql from 'mysql2'; //instalado via npm e importado


// Configuração a conexão
const conexao = mysql.createConnection({
    //Local
        //   host: 'localhost',
        //   user: 'root',
        //  passowrd: '',
        //  database: 'mobile'

    // Remoto 
         host: 'ns1046.hostgator.com.br',
         user: 'suniow89_adriel',
         password: '440Adriel@',
         database: 'suniow89_apiadriel'
});

// conectando ao banco de dados
// conexao.connect();

conexao.connect (erro => {
    if(erro) {
        console.error(`Erro ao conectar: ${erro.message}`); //
    } else {
        console.log(`Banco de dados conectado em ${conexao.config.host}`);
    }
});

export default conexao;