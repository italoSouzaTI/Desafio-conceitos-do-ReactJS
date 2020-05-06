import React, {useState,useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([])

  useEffect(() => {
   api.get('repositories').then(reponse=>{
     setRepository(reponse.data)
   })
  console.log(repository)
  }, [])
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:'Umbriel',
      url:'https://github.com/rocketseat/umbriel',
      techs: ['Node.js', 'ReactJs']
    })

    setRepository([...repository, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repository.filter(
      repo => repo.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          // repository.length ===0 ? 
          // <li>Resositorio vazio</li>
          // :
          repository.map(repo=>(
            <li key={repo.id}>
              {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
