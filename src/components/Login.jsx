import React from 'react';
import '../css/login.css'
import { login } from './utils';

export default props =>
    <div className="container-fluid d-flex justify-content-center alturamax align-items-center bg-primario-sem-opcidade">
        <div className="row">
            <div className="col bg-white pb-5 pt-5 pl-5 pr-5 rounded shadow">
                <h3 className="text-center mb-4 bold">Login</h3>
                <input type="text" id="formInput" className="rounded p-2 d-block largura25 fonte-primaria usuario borda-primaria" placeholder="Usuario" />

                <input type="password" id="formInput" className="rounded p-2 d-block mt-4 fonte-primaria senha borda-primaria" placeholder="Senha" />
                <button className="bg-primario text-white col mt-4 border-0 p-2 rounded" onClick={login}>Entrar</button>
            </div>
        </div>
    </div>