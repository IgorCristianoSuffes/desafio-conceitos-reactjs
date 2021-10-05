import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [ , setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      id: "123645465456",
      url: "https://github.com/josepholiveira",
      title: `Novo projeto ${Date.now()}`,
      techs: ["React", "Node.js"]
    }
    );

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repositorie => repositorie.id !== id
    ));

    //await api.get('repositories').then(response => {
    //  setRepositories(response.data);
    //});

    //const index = id;

    //repositories.splice(index, 1)

    //console.log(repositories);

    //setRepositories([...repositories, repositories]);

    //setRepositories([teste]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          
          { repositories.map(repositorie => <li key={repositorie.id} >{ repositorie.title }
          
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
          
          </li>) }

          
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
