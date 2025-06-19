import { useState, useEffect } from 'react';
import './App.css'; // Se precisar de estilos

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/db-content');
        if (!response.ok) throw new Error('Erro na requisição');
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h2>Usuários do Banco de Dados</h2>

      {loading && <p style={{ fontStyle: 'italic' }}>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      {!loading && !error && (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;