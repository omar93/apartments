import  express from 'Express'

const app = express()
const port = 3000

app.use(express.static('public'))

app.post('/', (req, res) => {
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
})