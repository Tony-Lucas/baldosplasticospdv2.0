import React from 'react'
import '../../css/venda.css';

export default props =>
    <div className="col mt-5 d-none" id="novaMercadoria">
        <div className="row ">
            <div className="col col-lg-5 centralizar">
                <h3 className="text-center bold ">Nova Nota</h3>
            </div>
        </div>
        <div className="row">
            <div className="col col-lg-3 col-md-5 centralizar mt-4">
                <input type="text" className="col borda-primaria p-2 rounded texto-primario" placeholder="Nome do cliente" id="cliente"/>
            </div>
        </div>
        <div className="row">
            <div className="col col-lg-3 col-md-5 centralizar mt-4">
                <div className="col p-0">
                    <input type="text" placeholder="Procurar mercadoria" className="col borda-primaria p-2 rounded texto-primario" onKeyUp={props.procuraMercadoria} id="inputBuscaNota" />
                </div>
                <div className="col bg-dark mt-2 position-absolute divMercadorias shadow bg-white d-none regular porcima" id="listaMercadoriaBsuca">
                    {props.mercadoriaSeach.map(item => {
                        return (
                            <div className="row mt-3 p-2 cursor divMercadoria d-flex align-items-center" onClick={props.completaCampos()}>
                                <div className="col-9">
                                    <span>{item.nome}</span>
                                    <span className="d-none">{item.id}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col p-0">
                    <div className="row mt-3">
                        <div className="col">
                            <input type="text" placeholder="Preço" className="col borda-primaria p-2 rounded texto-primario" disabled id="precoVenda" />
                            <input type="hidden" id="idMercadoria" />
                        </div>
                        <div className="col">
                            <input type="text" placeholder="Quantidade" className="col borda-primaria p-2 rounded texto-primario" id="quantidade" onKeyUp={props.calculaTotal()} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <input type="text" placeholder="Preço com desconto" className="col borda-primaria p-2 rounded texto-primario" id="desconto" onKeyUp={props.calculaDesconto()} />
                        </div>
                        <div className="col">
                            <input type="text" placeholder="Total" className="col borda-primaria p-2 rounded texto-primario" disabled id="total" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col col-lg-3 col-md-5 centralizar">
                <button className="float-right bg-success border-0 text-white p-2 rounded" onClick={props.addCarrinho}>Adicionar</button>
            </div>
        </div>
        <div className="row">
            <div className="col col-lg-6 centralizar mt-5 regular">
                <h3 className="bold text-center">Carrinho</h3>
                <table className="table mt-4 shadow">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Preço com desconto</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Total</th>
                            <th scope="col">Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.carrinho.map(item => {
                            return (
                                <tr>
                                    <td>{item.nome}</td>
                                    <td>{item.precoVenda}</td>
                                    <td>{item.desconto}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.total}</td>
                                    <td><button className=" btn btn-danger" idMercadoria={item.id} onClick={props.deletaItem()}>Deletar</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <h3 className="bold text-right mt-5 mb-4">Subtotal: {parseFloat(props.subtotal).toFixed(2)}</h3>
                <button className="btn btn-danger float-left mt-4" onClick={props.toggleNovaNota}>Cancelar</button>
                <button className="btn btn-success float-right mt-4" onClick={props.finalizaNota}>Finalizar</button>
            </div>
        </div>
    </div>