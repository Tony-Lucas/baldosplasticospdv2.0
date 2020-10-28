import React from 'react'

export default props =>

    <div className="col-9 alturamax  flex-column justify-content-center align-items-center centralizar d-none" id="detalheVenda">
        <div className="row">
            <div className="col">
                <h3 className="bold">Detalhe Venda</h3>
                <h4 className="text-center regular mt-4 regular">Cliente: {props.nota.cliente}</h4>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col d-flex flex-column align-items-center">
                <table className="table table-hover">
                    <thead className="bg-primario text-white">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Desconto</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.mercadorias.map((item,index) => {
                            return(
                                <tr>
                                    <td>{item.nome}</td>
                                    <td>{item.precoVenda}</td>
                                    <td>{props.vendas[index].quantidade}</td>
                                    <td>{props.vendas[index].desconto}</td>
                                    {parseFloat(props.vendas[index].desconto) != 0 && 
                                    
                                        <td>{(parseFloat(props.vendas[index].desconto) * props.vendas[index].quantidade).toFixed(2)}</td>

                                    }
                                    {parseFloat(props.vendas[index].desconto) === 0 && 
                                    
                                    <td>{(parseFloat(item.precoVenda) * props.vendas[index].quantidade).toFixed(2)}</td>

                                }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-danger mt-4" onClick={props.fechaDetalheVenda}>Voltar</button>
            </div>
        </div>
    </div>
