import Incomplete from '../assets/uncomplet.png'
import Complete from '../assets/complet.png'

function Tomate({ id, estado, onTapar }) {
  return (
    <div style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
      {estado === 'normal' && (
        <>
          <p>🍅 TOMATE</p>
          <button onClick={() => onTapar(id)}>Tapar</button>
        </>
      )}
      {estado === 'salvado' && (
        <>
          <img src={Complete} alt="Salvado" style={{ width: '80px', height: '80px' }} />
          <p>Salvado</p>
        </>
      )}
      {estado === 'comido' && (
        <>
          <img src={Incomplete} alt="Comido" style={{ width: '80px', height: '80px' }} />
          <p>Comido</p>
        </>
      )}
    </div>
  );
}

export default Tomate;