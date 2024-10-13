import  express from 'Express'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(cors())
app.use(express.json());

app.post('/', (req, res) => {
  // Create data with hemnet link
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
})