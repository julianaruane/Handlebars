const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set("view engine", "handlebars");


let pessoas = [
    { id: 1, nome: 'pessoa 1' },
    { id: 2, nome: "pessoa 2" },
    { id: 3, nome: 'pessoa 3' },

];


//vamos ter uma pagina pricipal, listar(excluir ta incluso), cadastrar, editar e detalhar
//por enquanto vamos trabalhar só com nome
//sempre temos que ter uma rota, pra receber a requisição
//HOME
app.get('/', (req, res) => {
    res.render/*renderizar a view home*/('home'); //toda iew tem por padrão'.handlebars' 
});
//LISTAR PESSOAS
app.get('/pessoas', (req, res) => {
    res.render('listarPessoas', { pessoas }) /*o {pessoas} diz pra pegar os dado, enderizar e mudar a página*/

});

//CADASTRAR PESSOA
app.get('/pessoas/nova', (req, res) => {
    res.render('cadastrarPessoa');
});

app.post('/pessoas', (req, res) => {
    const nome = req.body.nome;
    console.log(nome)
    const novaPessoa = {
        id: pessoas.length + 1,
        nome: nome
    };

    pessoas.push(novaPessoa);
    res.render('listarPessoas', { pessoas });
});

//Detalhar Pessoa

app.get('/pessoas/:id', (req,res) => {
const id = parseInt(req.params.id);
const pessoa = pessoas.find(p => p.id === id);
if(pessoa){
    res.render('detalharPessoa', { pessoa });

}else{
    res.status(404).send('pessoa não encontrada');
}

});


//EDITAR PESSOA

app.get('/pessoas/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return res.status(404).send('Pessoa não encontrada');

    res.render('editarPessoa', { pessoa });
});

app.post('/pessoas/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return res.status(404).send('Pessoa não encontrada');

    pessoa.nome = req.body.nome;
    res.render('listarPessoas', { pessoas });
});

//EXCLUIR PESSOA

app.post('/pessoas/excluir/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send('Pessoa não encontrada');

    pessoas.splice(index, 1);
    res.redirect('/pessoas');
});

app.listen(port, () => {
    console.log(`servidor em execução: http://localhost:${port}`); //tem que ser cráse
});



