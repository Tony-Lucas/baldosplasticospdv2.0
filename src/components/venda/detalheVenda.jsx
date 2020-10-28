import React from 'react'

export default props =>

    <div className="col-11 centralizar d-none mt-5" id="detalheVenda">
        <div className="row mt-lg-5 mt-md-4">
            <div className="col text-center">
                <h3 className="bold texto-primario">Detalhe Venda</h3>
                <h4 className="bold mt-5 mt-md-4 mt-lg-5">{props.nota.cliente}</h4>
            </div>
        </div>
        <div className="row mt-lg-5 mt-md-4">
            <div className="col-12 col-md-10 col-lg-8 centralizar scroll-x p-0 shadow">
                
                <table className="table ">
                    <thead className="bg-primario text-white">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Desconto</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.mercadorias.map((item, index) => {
                            return (
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
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-10 col-lg-8 centralizar mt-5 mb-4 p-0">
                <button className="btn btn-danger float-right" onClick={props.fechaDetalheVenda}>Voltar</button>
            </div>
        </div>
    </div>
