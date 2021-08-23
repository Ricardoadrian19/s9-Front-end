const express = require('express')

const app = express() 

app.use(express.json())

let notes = [
{
    "id": 1,
    "content": "Subscribanse a mi canal",
    "date": "2019-05.30TI17:30:31.098Z",
    "important": true
},
{
    "id": 2,
    "content": "Me voy a estudiar",
    "date": "2019-05.30TI18:39:34.091Z",
    "important": false,
},
{
    "id": 3,
    "content": "Aprender los datos de JS ",
    "date": "2019-05.30TI19:20:14.298Z",
    "important": true,
}
]


app.get('/',(request, response)=>{
    response.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes',(request, response)=>{
    response.json(notes)
})

app.get('/api/notes/:id',(request, response) => {
    const id = Number(request.params.id)
    console.log({id})
    const note = notes.find(note => note.id === id )
    console.log({note})
    if (note){
        response.json(note)
    } else{
        response.status(404).send()
    }
})

app.delete('/api/notes/:id',(request, response)=>{
    const id = Number(request.params.id)
    notes = notes.filter(note=> note.id != id)
    response.status(204).send()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || note.content){
    return response.status(400).json({
      error: 'required content is missing'
    })
  }
  console.log(note)
const ids= notes.map(note => note.id)
const maxId = Math.max(...ids)


const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
}
notes = notes.concat(newNote)

response.json(newNote)
})

const PORT = 3001
app.listen(PORT,() => {
    console.log (`Server running on port ${PORT}`)
})