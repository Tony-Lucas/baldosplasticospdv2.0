import React from 'react'
import '../css/menu.css'
export default props =>

    <div className="col-1 col-md-2 col-lg-1 bg-primario alturamax d-none d-md-block d-lg-block">
        <div className="row navegacao">
            <div className="col d-flex flex-column justify-content-center navegacao">
                <a href="/mercadorias" className="bold text-white text-center mb-5 text-decoration-none">Mercadorias</a>
                <a href="/vendas" className="bold text-white text-center mb-5 text-decoration-none">Vendas</a>
                <a href="/relatorios" className="bold text-white text-center text-decoration-none">Relatórios</a>
            </div>
        </div>
        <div className="row sair">
            <div className="col sair d-flex flex-column  justify-content-end">
                <button className="border-0 text-white bg-primario-escuro mb-4 p-1 rounded" onClick={props.logout}>Sair</button>
            </div>
        </div>
    </div>