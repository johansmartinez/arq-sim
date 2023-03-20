import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Modal({jugador, getInfo, cerrar}) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: `Puntos/Juego ${jugador}`,
        },
        },
    };

    const info= getInfo(jugador);
    console.log(info)
    const labels = info.map(e=>e.juego);

    const puntos= info.map(e=>e.puntos);

    const data = {
        labels,
        datasets: [
        {
            label: `Puntos/Juego ${jugador}`,
            data: puntos,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        ],
    };

    return (<div style={
            { width: '100vw',padding:"10px", height:"100vh",zIndex: 3,position: 'fixed',backgroundColor: 'rgba(0,0,0,0.4)',left: 0, top: 0 }}>
        
        <div className='card' style={{maxWidth:"70vw", margin:"auto"}}>
            <div className='card-header my-2 px-4'>
                <div className='row d-flex justify-content-center'>
                    <h3 className='col'>Puntos por juego de: {jugador}</h3>
                    <button className='col btn btn-outline-danger btn-sm' style={{maxWidth:"30px"}} onClick={cerrar}>x</button>
                </div>
            </div>
            <div className='card-body' >
                <Line options={options} data={data} style={{maxWidth:"100%", height:"auto"}}/>;
            </div>
        </div>
    </div>);
}

export {Modal};