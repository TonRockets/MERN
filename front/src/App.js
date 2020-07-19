import React, { useState, useEffect } from 'react';
// import api from './services/api'
import axios from 'axios'
import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'


function App() {

  const [devs, setDevs] = useState([])
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [nome, setNome] = useState("")
  const [tarefa, setTarefa] = useState("")
  const [meta, setMeta] = useState("")
  const [_id, set_id] = useState("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
        console.log('Localização reconhecida com sucesso!')
      },
      (err) => {
        console.log('Erro ao pegar a localização2')
      },
      {
        timeout: 30000
      }
    )
  }, [])

  useEffect(() => {
    async function loadDevs() {
      const response = await axios.get('http://localhost:3003/api/nomes')

      setDevs(response.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(e) {

    const response = await axios.post('http://localhost:3003/api/nomes', {
      nome,
      tarefa,
      meta
    })

    console.log(response.data)
  }

  async function handleRemove(_id) {

    const response = await axios.delete(`http://localhost:3003/api/nomes/${_id}`, { _id })

    console.log(response)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
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

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLatitude(e.target.value)} />
            </div>
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
                    <a href="http://localhost:3000/"><button type="button" onClick={() => handleRemove(dev._id)}>Excluir</button></a>
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
