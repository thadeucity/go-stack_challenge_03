import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => { 
      setRepositories (res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Teste de post ${Date.now()}`,
      url: `http://${Math.random()}.com`,
      techs: [
        `Tech ${Math.random()}`,
        `Tech ${Math.random()}`,
        `Tech ${Math.random()}`
      ]
    });

    const repo = res.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`);

    if(res.status =! 204) return;

    setRepositories(repositories.filter( repo => repo.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( (repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
