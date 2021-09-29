import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Igor Cristiano Suffes"
    }
    );

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const index = id;

    repositories.splice(index, 1)

    console.log(repositories);

    setRepositories([...repositories, repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          
          { repositories.map(repositorie => <li key={repositorie.id} >{ repositorie.title }
          
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          
          </li>) }

          
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
