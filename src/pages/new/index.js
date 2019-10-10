
// NEW

import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg'
import api from '../../services/api'

import './styles.css'

function New({ history }){

    const [thumbnail, setThumbnail] = useState(null)
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPreco] = useState('');

    const preview = useMemo(() =>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail])

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    function clearPreview(event){
        event.preventDefault();
        setThumbnail(null);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>

                <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={ thumbnail ? "has-thumbnail" : ''}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera}  alt="camera logo"/>
                </label>
                <button 
                    onClick={clearPreview} 
                    className={thumbnail ? 'btn-clear-preview' : 'btn-clear-preview-none'}
                    >Excluir imagem</button>

                <label htmlFor="company">EMPRESA *</label>
                <input 
                    type="text" 
                    id="company" 
                    value={company}
                    placeholder="Sua empresa incrível" 
                    onChange={event => setCompany(event.target.value)}
                    required
                />
                <label htmlFor="techs">TECNOLOGIA *<span>(Separadas por vírgula)</span></label>
                <input 
                    type="text" 
                    id="techs" 
                    value={techs}
                    placeholder="Tecnologias usadas" 
                    onChange={event => setTechs(event.target.value)}
                    required
                />
                <label htmlFor="price">PREÇO/DIA * <span>(Digite 0 para gratuidade)</span></label>
                <input
                type="number"
                id="price"
                value={price}
                placeholder="Digite o valor"
                onChange={event => setPreco(event.target.value)}
                min="0"
                />
                <button type="submit" className="btn">Enviar</button>
            </form>
        </>
    );
}

export default New;