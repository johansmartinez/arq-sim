function JuegoInfo({info, index}) {

    const puntosXgenero=(genero)=>{
        let t1=info.info_puntos.pje1.filter(j=>j.genero===genero);
        let t2=info.info_puntos.pje2.filter(j=>j.genero===genero);

        let puntos=0;
        t1.map(j=>puntos+=j.rondas)
        t2.map(j=>puntos+=j.rondas)
        return puntos;
    }

    return (
        <div>
            <h3>Juego #{(index+1)}</h3>
            <h3> EQUIPO 1: {info.eq1_puntos} - EQUIPO 2: {info.eq2_puntos}</h3>
            <h3> Jugador con más Suerte:</h3>
            <p> {info.max_suerte.jugador} - {info.max_suerte.suerte}</p>
            <h3> Jugador con más experiencia ganada:</h3>
            <p> {info.max_exp.jugador}:  +{info.max_exp.exp}</p>
            <h3> Rondas ganadas:</h3>
            <p> Hombres: {puntosXgenero("H")} - MUJERES: {puntosXgenero("M")}</p>
        </div>

    );
}

export {JuegoInfo};