import React, { useState, useEffect } from 'react';
// import api from './services/api'
import axios from 'axios'
import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'


function App() {

  const [devs, setDevs] = useState([])
  const [nome, setNome] = useState("")
  const [tarefa, setTarefa] = useState("")
  const [meta, setMeta] = useState("")

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords
  //       setLatitude(latitude)
  //       setLongitude(longitude)
  //       console.log('Localização reconhecida com sucesso!')
  //     },
  //     (err) => {
  //       console.log('Erro ao pegar a localização2')
  //     },
  //     {
  //       timeout: 30000
  //     }
  //   )
  // }, [])
  async function loadDevs() {
    const response = await axios.get('http://localhost:3003/api/nomes')
    setDevs(response.data)
  }

  async function handleAddDev(e) {

    const response = await axios.post('http://localhost:3003/api/nomes', {
      nome,
      tarefa,
      meta
    })
  }

  // async function handleRemove(_id) {
  //   try {
  //     await axios.delete(`http://localhost:3002/api/nomes/${_id}`, { _id })
  //     loadDevs()
  //   } catch (error) {
  //     console.log('aconteceu um erro ...', error)
  //   }

  function handleRemove(_id) {
    axios.delete(`http://localhost:3003/api/nomes/${_id}`, { _id }).then(( ) => {
      loadDevs()
    }).catch(err => console.log('aconteceu um erro', err))
  }

  useEffect(() => {

    loadDevs()
  }, [])

  return (
    <div id="app">
      <aside>
        <strong>Inserir Tarefas</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="nome">Nome</label>
            <input name="nome" id="nome" required value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="tarefa">Tarefa</label>
            <input name="tarefa" id="tarefa" required value={tarefa} onChange={e => setTarefa(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="tarefa">Meta</label>
            <input name="meta" id="meta" required value={meta} onChange={e => setMeta(e.target.value)} />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul >
          {devs.map(dev => (
            <li key={dev._id} valule={dev._id} className="dev-item">
              <header>
                <div className="user-info">
                  <strong>{dev.nome}</strong>
                  <span>{dev.tarefa}</span>
                  <p>{dev.meta}</p>
                  <button type="button" onClick={() => handleRemove(dev._id)}>Excluir</button>
                </div>
              </header>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
