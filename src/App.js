import { useState } from "react";
import { Form } from "./components/Form";
import { Sim } from "./components/Sim";

function App() {
  const [view, setView] = useState("form");
  const [juegos, setJuegos] = useState(1);

  const simular=(event)=>{
    if(event) event.preventDefault();
    setView("sim");
  }

  return (
    <div className="container mt-4">
      <h2>Simulación de Arquería</h2>
      { view ==="form" && <Form juegos={juegos} cambiarJuegos={setJuegos} simular={simular}/>}
      { view ==="sim" && <Sim juegos={juegos}/>}
    </div>
  );
}

export default App;
