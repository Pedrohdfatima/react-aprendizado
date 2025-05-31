// src/pages/Hello.js
import React, { useState, useRef, useEffect } from 'react';

function Hello(props) {
    const {name, removerNome, editarNome} = props;
    const [editando, setEditando] = useState(false);
    const [nomeEditado, setNomeEditado] = useState(name);
    const inputRef = useRef(null);

    useEffect(() => {
        if(editando && inputRef.current){
            inputRef.current.focus();
        }
    }, [editando]);

    const salvarEdicao = () => {
        const nomeLimpo = nomeEditado.trim();
        if (nomeLimpo === "") {
            setNomeEditado(name);
            setEditando(false);
            return;
        }
        if (nomeLimpo !== name) {
            editarNome(name, nomeLimpo);
        }
        setEditando(false)
    };

    const cancelarEdicao = () => {
        setNomeEditado(name)
        setEditando(false)
    };

    const handleKeyDown = (e) =>{
        if (e.key === "Enter") {
            salvarEdicao();
        } else if (e.key === "Escape") {
            cancelarEdicao();
        }
    }


  return (
<div className="hello-item">
    {editando ? (
        <input
        ref={inputRef}
        value={nomeEditado}
        onChange={(e) => setNomeEditado(e.target.value)}
        onBlur={salvarEdicao}
        onKeyDown={handleKeyDown}
        className='edit-input'
        />
    ) : (
        <p onClick={() => setEditando(true)}>{`òla, ${name}!`}</p>
    )}
        <button onClick={() => removerNome(name)}>Remover</button>

</div>
  );
}

export default Hello;
