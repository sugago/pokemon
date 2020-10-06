import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import './App.css';

function App() {

  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(async res => {
        try {
          const pokemon = await Promise.all(res.results.map( async p => {
            const info = await fetch(p.url)
            const infoJSON = await info.json()
            return {
              id: infoJSON.id,
              name: p.name,
              photo: infoJSON.sprites?.front_default
            }
          }))
          setPokemonList(pokemon)
        } catch (err) {
          console.log(err)
        }
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            { pokemonList.map(
              (pokemon, index) => (
                <tr key={index}>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name}</td>
                  <td><img src={pokemon.photo} alt={pokemon.name} /></td>
                </tr>
              )
            ) }
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
