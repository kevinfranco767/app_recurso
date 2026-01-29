import { useState, useEffect } from 'react';
import Tomate from './itemActividad/ItemActividad';

function App() {
  const [tomates, setTomates] = useState([]);
  const [vidas, setVidas] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Generar tomate cada 2 segundos
  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      const nuevoTomate = {
        id: Date.now(),
        estado: 'normal'
      };
      setTomates(prev => [...prev, nuevoTomate]);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver]);

  // El pato intenta comer después de 3 segundos
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTomates(prev => {
        const actualizado = prev.map(tomate => {
          if (tomate.estado === 'normal') {
            setVidas(v => {
              const nuevas = v - 1;
              if (nuevas <= 0) {
                setGameOver(true);
              }
              return nuevas;
            });
            return { ...tomate, estado: 'comido' };
          }
          return tomate;
        });
        return actualizado.filter(t => t.estado !== 'comido');
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const taparTomate = (id) => {
    setTomates(prev => 
      prev.map(tomate => 
        tomate.id === id ? { ...tomate, estado: 'salvado' } : tomate
      )
    );
    setScore(s => s + 1);
    setTimeout(() => {
      setTomates(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

  const reiniciar = () => {
    setTomates([]);
    setVidas(3);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div>
      <h1>Protege los tomates</h1>
      <p>Vidas: {vidas}</p>
      <p>Puntos: {score}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tomates.map(tomate => (
          <Tomate 
            key={tomate.id}
            id={tomate.id}
            estado={tomate.estado}
            onTapar={taparTomate}
          />
        ))}
      </div>

      {gameOver && (
        <div>
          <h2>Juego Terminado</h2>
          <p>Puntuación final: {score}</p>
          <button onClick={reiniciar}>Jugar de Nuevo</button>
        </div>
      )}
    </div>
  )
}

export default App
