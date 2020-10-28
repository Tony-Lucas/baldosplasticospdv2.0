import React from 'react'
import '../css/menu.css';

export default props =>

    <div className="col-12 col-sm-12 d-md-none d-lg-none">
        <div className="row">
            <div className="col-7 d-flex flex-column justify-content-center alturamax bg-primario sidebar position-absolute d-none d-md-none d-lg-none slideright porcima" id="sidebar-mobile">
                <div className="row ">
                    <div className="col d-flex flex-column justify-content-center">
                        <a href="/mercadorias" className="bold text-white text-decoration-none link-menu mb-5 ml-4">Mercadorias</a>
                        <a href="/vendas" className="bold text-white text-decoration-none link-menu mb-5 ml-4">Vendas</a>
                        <a href="/relatorios" className="bold text-white text-decoration-none link-menu  ml-4">Relatórios</a>
                        <button className="border-0 bg-primario-escuro rounded text-white p-2 mb-3 col mt-5" onClick={props.logout} >Sair</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

