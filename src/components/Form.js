
function Form( {juegos, cambiarJuegos, simular}) {

    return (
        <form className="p-3">
            <div className="mb-3">
                <label className="form-label">Número de Juegos</label>
                <input type="number" min={1} value={juegos} onChange={e=>cambiarJuegos(e.target.value)} className="form-control" />
            </div>
            <div className="row justify-content-center">
                <button type="button" disabled={juegos<=0} className="btn btn-primary col-md-6" onClick={e=>simular(e)}>Simular</button>
            </div>
        </form>
    );
}

export {Form};