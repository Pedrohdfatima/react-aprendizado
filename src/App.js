// src/App.js
import React, { useState, useEffect } from 'react';
import Hello from './pages/Hello'; // importa o componente filho
import "./styles/app.css";

function App(props) {
  const nomeEntrada = props.subject; // pega o valor da prop passada

    //Recuperar LocalStorage
    const nomesSalvos = JSON.parse(localStorage.getItem("outrosNomes")) || ["Joca", "Jessica", "Ivy"];
    const [outrosNomes, setOutrosNomes] = useState(nomesSalvos);
    const [novoNome, setNovoNome] = useState("");
    const [erro, setErro] = useState("")

  // Função para adicionar um novo nome na lista
  const adicionarNome = () => {
    const nomeLimpo = novoNome.trim();
    if (nomeLimpo === ""){
      setErro("Por Favor, Preencha com um nome")
      return;
}
      if (outrosNomes.includes(nomeLimpo)){ 
        setErro("Esse nome já existe") 
        return; //não aceita input vazio
      }
  const novaLista = [...outrosNomes, nomeLimpo];
  setOutrosNomes(novaLista);
  setNovoNome("")
  setErro("");
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter"){
      adicionarNome();
    }
  }

 useEffect(() => {
  localStorage.setItem("outrosNomes", JSON.stringify(outrosNomes));
}, [outrosNomes]);
  
//remover nome
 const removerNome = (nomeParaRemover) => {
  if (window.confirm(`Tem Certeza que deseja remover "${nomeParaRemover}"?`)){
  const novaLista = outrosNomes.filter(nome => nome !== nomeParaRemover)
    setOutrosNomes(novaLista)
 }
};

const editarNome = (nomeAntigo, nomeNovo) =>{
  if (nomeNovo === "" || outrosNomes.includes(nomeNovo)){
   setErro("Nome Invalido Ou já Existente");
    return;
  }
  const novaLista = outrosNomes.map(nome =>
    nome === nomeAntigo ? nomeNovo : nome
  );
  setOutrosNomes(novaLista)
}

  return (
    <div class="app-container">
      <h1>Bem-vindo ao React, {nomeEntrada}!</h1>
      
      <input 
        type="text"
        placeholder='Digite um nome'
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={adicionarNome}>Adicionar Nome</button>
{erro && <div className='error-message'>{erro}</div>}
    <div className="hello-list">
      {outrosNomes.map((nome, index)=>
        <Hello key={index} name={nome} removerNome={removerNome} editarNome={editarNome}/>
      )}
   </div>
    </div>
  );
}

export default App;
