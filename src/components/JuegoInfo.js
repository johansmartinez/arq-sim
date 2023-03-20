function JuegoInfo({info, index}) {

    const puntosXgenero= (genero)=>{
        let t1= info.info_puntos.pje1.filter(j=>j.genero===genero);
        let t2= info.info_puntos.pje2.filter(j=>j.genero===genero);

        let puntos1 =  t1.reduce((sum, item)=>sum + item.puntos, 0);
        let puntos2 =  t2.reduce((sum, item)=>sum + item.puntos, 0);
        return puntos1+puntos2;
    }

    const ganador=()=>{
        if (info.eq1_puntos>info.eq2_puntos) {
            return "EQUIPO 1";
        }else if (info.eq2_puntos>info.eq1_puntos) {
            return "EQUIPO 2";
        }else{
            return "SIN GANADOR";
        }
    }

    return (
        <div className="card mt-4 mb-4">
            <div className="card-header">
                <h3 className="text-center">Juego #{(index+1)} - {ganador()}</h3>
                <hr/>
                <div className="row">
                    <p className="col text-center font-weight-bold">EQUIPO 1:</p>
                    <p className="col text-center font-weight-bold">EQUIPO 2:</p>
                </div>
                <div className="row">
                    <p className="col text-center">{info.eq1_puntos}</p>
                    <p className="col text-center">{info.eq2_puntos}</p>
                </div>
                
            </div>
            <div className="card-body">
                <div>
                    <h5> Jugador con más Suerte:</h5>
                    <div className="px-2">
                        <p className="col"> Jugador: {info.max_suerte.jugador}</p>
                        <p className="col"> Suerte: {info.max_suerte.suerte}</p>
                    </div>
                    <hr/>
                </div>
                <div>
                    <h5> Jugador con más experiencia ganada:</h5>
                    <div className="px-2">
                        <p className="col">Jugador: {info.max_exp.jugador}</p>
                        <p className="col">Experiencia Ganada:  +{info.max_exp.exp}</p>
                    </div>
                </div>
                
            </div>
            <div className="card-footer">
                <h5 className="text-center"> Rondas ganadas por género:</h5>
                <div className="row text-center">
                    <p className="col"> Hombres:</p>
                    <p className="col"> Mujeres:</p>
                </div>
                <div className="row text-center">
                    <p className="col">{ puntosXgenero("H")}</p>
                    <p className="col">{ puntosXgenero("M")}</p>
                </div>
            </div>
        </div>

    );
}

export {JuegoInfo};