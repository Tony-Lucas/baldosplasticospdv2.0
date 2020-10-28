import React from 'react';
import {formataValorBr} from '../utils';
export default props =>

    <div className="col mt-4 mt-lg-5 d-none" id="alteraMercadoria">
        <div className="row">
            <div className="col mt-5">
                <h2 className="text-lg-right text-center text-md-center text-lg-center pb-4 mt-4 bold texto-primario mt-lg-5 mr-lg-0 mr-0 mr-md-4 mt-md-4">Alterar Mercadoria</h2>
                <div className="row">
                    <div className="col-11 col-lg-3 col-md-7 centralizar mt-4">
                        <div className="row">
                            <div className="col">
                                <input type="hidden" id="nomeImg" value={props.mercadoria.nomeImg} />
                                <input type="hidden" id="idAltera" defaultValue={props.mercadoria.id} />
                                <input type="text" className="borda-primaria rounded p-2 col" defaultValue={props.mercadoria.nome} id="alteraNome" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="borda-primaria rounded p-2 col" defaultValue={props.mercadoria.precoCompra} id="AlteraPrecoCompra" />
                            </div>
                            <div className="col">
                                <input type="text" className="borda-primaria rounded p-2 col" defaultValue={props.mercadoria.precoVenda} id="AlteraPrecoVenda" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" className="borda-primaria rounded p-2 col" defaultValue={props.mercadoria.nomeImg} disabled />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <input type="file" id="AlteraImg" />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col ">
                                <button className="bg-danger border-0 p-2 col rounded text-white " onClick={props.abreAltera}>Voltar</button>
                            </div>
                            <div className="col">
                                <button className="bg-success border-0 p-2 col rounded text-white" onClick={props.alteraMercadoria}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-7 col-lg-2 centralizar  mt-5 d-none" id="sucessoAltera">
                <div className="row">
                    <div className="col bg-success p-2 text-center rounded animate-notification shadow ">
                        <i class="fas fa-check text-white mr-3"></i>
                        <span className="regular text-white">Alterado com sucesso</span>
                    </div>
                </div>
            </div>
            <div className="col-7 col-lg-2 centralizar mt-5 d-none" id="falhaAltera">
                <div className="row">
                    <div className="col bg-danger p-2 text-center rounded animate-notification shadow ">
                        <i class="fas fa-times text-white mr-3"></i>
                        <span className="regular text-white">Falha ao alterar</span>
                    </div>
                </div>
            </div>
            <div className="col-7 col-lg-2 centralizar mt-5 d-none" id="faltaAltera">
                <div className="row">
                    <div className="col bg-warning p-2 text-center rounded animate-notification shadow ">
                        <i class="fas fa-exclamation text-white mr-3"></i>
                        <span className="regular text-white">Campos faltando</span>
                    </div>
                </div>
            </div>
        </div>

    </div>