import { useState } from "react";
import { JuegoInfo } from "./JuegoInfo";

function Sim({ juegos }) {

    const [simulando, setSimulando] = useState(false);
    const [juegosInfo, setJuegosInfo] = useState([]);

    const JUG_X_EQUIPO = 5;
    const MED_RES = 35;
    const DES_RES = 10;
    const EXP = 10;
    const MIN_SUE = 1;
    const MAX_SUE = 3;

    const NUM_RONDAS=10;

    const crearEquipo = (prefix) => {
        let equipo = [];
        let name = 65;

        for (let i = 0; i < JUG_X_EQUIPO; i++) {
            name += i;
            equipo.push({
                nombre: `${prefix}-${String.fromCharCode(name)}`,
                genero: selecccionarGenero(),
                resistencia: Math.trunc(generarNumeroNormal(MED_RES, DES_RES)),
                experiencia: EXP,
                sum_exp:0,
                penitencia:5,
                suerte:0,
                elecciones:0,
                rondasGanadas:0,
                puntos:0
            });
        }
        return equipo;
    };

    function selecccionarGenero() {
        let g=["M", "H"];
        return g[Math.floor(Math.random() * g.length)];
    }

    function generarNumeroDecimalEntre(minimo, maximo) {
        return parseFloat((Math.random() * (maximo - minimo) + minimo).toFixed(2));
    }

    function generarNumeroNormal(media, desviacionEstandar) {
        var u = 1 - Math.random();
        var v = 1 - Math.random();
        var z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return Math.abs(media + z * desviacionEstandar);
    }

    const t1=crearEquipo("T1");
    const t2=crearEquipo("T2");


    //--- CEN- INT - EX- ERR
    const MUJ_DIANAS=[0.3, 0.58, 0.85, 1];
    const HOM_DIANAS=[0.2, 0.53, 0.93, 1];
    const VALORES_DIANAS=[10, 9, 8, 0];

    const generarSuerte=async (equipo)=>{
        for (let i = 0; i < equipo.length; i++) {
            equipo[i].suerte=await generarNumeroDecimalEntre(MIN_SUE, MAX_SUE);
        }
        let index=0;
        let max=0;
        for (let i = 0; i < equipo.length; i++) {
            const j=equipo[i];
            if (max<j.suerte) {
                max=j.suerte;
                index=i;
            }
        }
        for (let i = 0; i < equipo.length; i++) {
            if (i===index) {
                equipo[index].elecciones+=1;
            }else{
                equipo[i].elecciones=0;
            }
        }
        return index;
    }

    const lanzarXveces=(equipo, lanzador)=>{
        let resAnterior= equipo[lanzador].resistencia;
        let puntos=0;
        while (equipo[lanzador].resistencia>=equipo[lanzador].penitencia) {
            puntos+= lanzar(equipo[lanzador].genero);
            equipo[lanzador].resistencia-= equipo[lanzador].penitencia
        }
        equipo[lanzador].resistencia= resAnterior - Math.trunc(generarNumeroDecimalEntre(1,2)); 
        return puntos;
    }

    const lanzar=(genero)=>{
        let l=Math.random();
        const dianas= (genero==="M")?MUJ_DIANAS:HOM_DIANAS;
        let tiro=0;
        for (let i = 0; i < dianas.length; i++) {
            if (l<=dianas[i]) {
                tiro=i;
                break;
            }
        }
        return VALORES_DIANAS[tiro];
    }

    const validarPuntos=(puntos1, puntos2, temp1, temp2, l1, l2)=>{
        if (puntos1=== puntos2) {
            let a=puntos1;
            let b=puntos2;
            while (a===b) {
                a=lanzar(temp1[l1].genero)
                b=lanzar(temp2[l2].genero)
                if (a > b) {
                    temp1[l1].experiencia+=3;
                    temp1[l1].sum_exp+=3;
                    temp1[l1].rondasGanadas+=1;
                }
                if (b > a) {
                    temp2[l2].experiencia+=3
                    temp2[l2].sum_exp+=3
                    temp2[l2].rondasGanadas+=1
                }
            }
        }else if (puntos1 > puntos2) {
            temp1[l1].experiencia+=3;
            temp1[l1].sum_exp+=3;
            temp1[l1].rondasGanadas+=1;
        }else{
            temp2[l2].experiencia+=3;
            temp2[l2].sum_exp+=3;
            temp2[l2].rondasGanadas+=1
        }
        if (temp1[l1].sum_exp>=9) {
            temp1[l1].penitencia=1
        }
        if (temp2[l2].sum_exp>=9) {
            temp2[l2].penitencia=1
        }
    }

    const maxExpJuego=(temp1, temp2)=>{
        let me1=temp1.sort((j1,j2)=>j2.sum_exp-j1.sum_exp)[0];
        let me2=temp2.sort((j1,j2)=>j2.sum_exp-j1.sum_exp)[0];
        if (me1>me2) {
            return {
                jugador: me1.nombre,
                exp: me1.sum_exp
            }
        }else{
            return {
                jugador: me2.nombre,
                exp: me2.sum_exp
            }
        }
    }

    const puntosXJuegoJugador=(temp1, temp2)=>{
        let pje1=temp1.map(j=>{return {jugador:j.nombre, genero: j.genero, puntos:j.puntos, rondas:j.rondasGanadas}})
        let pje2=temp2.map(j=>{return {jugador:j.nombre, genero: j.genero, puntos:j.puntos, rondas:j.rondasGanadas}})
        return {pje1, pje2};
    }
    
    const comenzar=async ()=>{
        let tempJI=[];
        for (let i = 0; i < juegos; i++) {
            let temp1=[...t1];
            let temp2=[...t2];
            let puntosE1=0;
            let puntosE2=0;
            let msInfo={
                jugador:"",
                suerte:0,
            }
            for (let j = 0; j < NUM_RONDAS; j++) {
                let l1= await generarSuerte(temp1);
                let l2= await generarSuerte(temp2);
                if (temp1[l1].suerte>msInfo.suerte) {
                    msInfo.jugador=temp1[l1].nombre;
                    msInfo.suerte=temp1[l1].suerte;
                }
                if (temp2[l2].suerte>msInfo.suerte) {
                    msInfo.jugador=temp2[l2].nombre;
                    msInfo.suerte=temp2[l2].suerte;
                }
                let puntos1=await lanzarXveces(temp1, l1);
                let puntos2=await lanzarXveces(temp2, l2);
                await validarPuntos(puntos1,puntos2, temp1, temp2, l1, l2);
                if (temp1[l1].elecciones===3) {
                    puntos1+= lanzar(temp1[l1].genero);
                    temp1[l1].elecciones=0;
                }
                if (temp2[l2].elecciones===3) {
                    puntos2+= lanzar(temp2[l2].genero);
                    temp2[l2].elecciones=0;
                }
                temp1[l1].puntos=puntos1;
                temp2[l2].puntos=puntos2;

                puntosE1+=puntos1;
                puntosE2+= puntos2;
            }
            
            
            tempJI.push({
                max_suerte:msInfo,
                max_exp:maxExpJuego(temp1, temp2),
                eq1_puntos: puntosE1,
                eq2_puntos: puntosE2,
                info_puntos: puntosXJuegoJugador(temp1,temp2)
            });
            puntosE1=0;
            puntosE2=0;
            msInfo={
                jugador:"",
                suerte:0,
            }
        }
        setJuegosInfo(tempJI);
    }

    

    return (
        <div className="mt-4">
            <label>Número de juegos: {juegos}</label><br/>
            <button onClick={comenzar}>Iniciar</button>
            {
                juegosInfo.map( (j, i)=>(
                    <JuegoInfo key={`jueinfo-${i}`} info={j} index={i}/>
                ))
            }
        </div>
    );
}

export { Sim };
