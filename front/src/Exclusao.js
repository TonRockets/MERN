import React, { useState } from 'react';
import api from './services/api'
import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'

function Exclusao({ value }) {

    const [_id, set_id] = useState("")

    async function handleRemoveDev(e) {

        const response = await api.delete(`/delete/${_id}`, { _id })

        console.log(response.data)
    }

    return (
        <div>
            <form onSubmit={handleRemoveDev}>
                <button type="submit"> Excluir</button>
            </form>
        </div>

    )
}

export default Exclusao