import React from 'react'

export default props =>

    <div className="col d-block d-md-none d-lg-none">
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <h4 className="bold mt-4 pl-3 texto-primario">BDP</h4>
                    </div>
                    <div className="col">
                        <button className="mt-4 mr-2 float-right border-0 bg-transparent"><i class="fas fa-bars fa-2x texto-primario" onClick={props.abreMenu}></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>