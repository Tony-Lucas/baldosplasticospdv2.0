import React from 'react'

export default props =>


    <div className="col mt-4 mt-lg-5 mt-md-5 d-none" id="cadastro">
        <div className="row">
            <div className="col">
                <h2 className="text-center pt-lg-5 mt-4 bold texto-primario">Cadastrar Mercadoria</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-lg-4 centralizar mt-lg-5 mt-5">
                <form id="formularioMercadoria">
                    <div className="row">
                        <div className="col-10 col-lg-10 centralizar">
                            <input type="text" className="col borda-primaria rounded p-2 " placeholder="Nome" id="nome" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-lg-10 centralizar mt-4">
                            <input type="text" className="col-12 col-lg-5 col-md-5 borda-primaria rounded p-2 " placeholder="Preço Compra" id="precoCompra" />
                            <input type="text" className="col-12 col-lg-5 col-md-5 borda-primaria rounded p-2 float-lg-right mt-4 mt-md-0 mt-lg-0 float-md-right" placeholder="Preço Venda" id="precoVenda" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 centralizar mt-5 mt-lg-4">
                            <input type="file" id="img"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-lg-10 centralizar mt-5">
                            <button className="bg-danger border-0 text-white rounded pl-3 pr-3 pb-2 pt-2" onClick={props.toggleCadastro}>Voltar</button>
                            <button className="bg-primario border-0 text-white rounded pl-3 pr-3 pb-2 pt-2 float-right" onClick={props.addMercadoria()}>Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-7 col-lg-2 centralizar  mt-5 d-none" id="sucesso">
                <div className="row">
                    <div className="col bg-success p-2 text-center rounded animate-notification shadow ">
                        <i class="fas fa-check text-white mr-3"></i>
                        <span className="regular text-white">Salvo com sucesso</span>
                    </div>
                </div>
            </div>
            <div className="col-7 col-lg-2 centralizar mt-5 d-none" id="falha">
                <div className="row">
                    <div className="col bg-danger p-2 text-center rounded animate-notification shadow ">
                    <i class="fas fa-times text-white mr-3"></i>
                        <span className="regular text-white">Falha ao cadastrar</span>
                    </div>
                </div>
            </div>
            <div className="col-7 col-lg-2 centralizar mt-5 d-none" id="falta">
                <div className="row">
                    <div className="col bg-warning p-2 text-center rounded animate-notification shadow ">
                    <i class="fas fa-exclamation text-white mr-3"></i>
                        <span className="regular text-white">Campos faltando</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
