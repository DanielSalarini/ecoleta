const express = require('express')
const nunjucks = require('nunjucks')
const db = require('./database/db.js')

const server = express()

// configurar pasta publica
server.use(express.static('public'))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// paginal inicial
server.get('/', (req, res) => {
    return res.render('index.html', { title: "Um titulo" })
})

// req.query uma forma de pegar os dados no formulario sem seguraça

server.get('/createPoint', (req, res) => {
    console.log(req.query)

    return res.render('createPoint.html')
})

server.post('/savePoint', (req, res) => {
    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send('Erro no cadastro!')
        } 

        console.log('Cadastrado com sucesso')
        console.log(this)

        return res.render('createPoint.html', { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get('/search', (req, res) => {
    const search = req.query.search

    if(search === "") {
        // pesquisa vazia
        return res.render('search.html', { total: 0 })

    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do Banco de Dados
        return res.render('search.html', { places: rows, total })
    })

    // Pesquisar todos
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     const total = rows.length
    //     return res.render('search.html', { places: rows, total })
    // })
    
})

// ligar o servidor
server.listen(3000, () => console.log('Server connected'))