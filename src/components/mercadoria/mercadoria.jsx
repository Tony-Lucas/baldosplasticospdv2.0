import React from 'react'
import '../../css/mercadoria.css'
import { btnBusca } from '../utils'
import NovaMercadoria from './novaMercadoria';
import AlteraMercadoria from './alteraMercadoria';
import {formataValorBr} from '../utils';

export default class Mercadoria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mercadorias: [],
            alteraMercadoria: []
        }
        this.maisDez = this.maisDez.bind(this);
        this.buscaMercadoria = this.buscaMercadoria.bind(this);
        this.toggleCadastro = this.toggleCadastro.bind(this);
        this.deletarMercadoria = this.deletarMercadoria.bind(this)
        this.abreAlteraMercadoria = this.abreAlteraMercadoria.bind(this)
        this.toggleAltera = this.toggleAltera.bind(this)
        this.alteraMercadoriaForm = this.alteraMercadoriaForm.bind(this);
    }

    componentDidMount() {

        fetch(`https://bdpapiserver.com/mercadoria/limite/${15}/${0}/${sessionStorage.getItem("token")}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                this.setState({ mercadorias: res.mercadoria[0] })
            });

    }

    async maisDez() {
        const result = await fetch(`https://bdpapiserver.com/mercadoria/limite/${15}/${this.state.mercadorias.length + 10}/${sessionStorage.getItem("token")}`);
        const json = await result.json();
        this.setState({ mercadorias: this.state.mercadorias.concat(json.mercadoria[0]) });
    }

    toggleCadastro() {
        const lista = document.getElementById("lista-mercadorias");
        const cadastro = document.getElementById("cadastro");
        lista.classList.toggle("d-none")
        cadastro.classList.toggle("d-none");
    }

    toggleAltera() {
        window.location.reload()
    }

    async alteraMercadoriaForm() {
        const formData = new FormData();
        formData.append("token", sessionStorage.getItem("token"));
        formData.append("nomeImg", document.getElementById("nomeImg").value);
        formData.append("nome", document.getElementById("alteraNome").value);
        formData.append("precoCompra", document.getElementById("AlteraPrecoCompra").value);
        formData.append("precoVenda", document.getElementById("AlteraPrecoVenda").value);
        formData.append("img", document.getElementById("AlteraImg").files[0])
        formData.append("id", document.getElementById("idAltera").value);
        const result = await fetch(`https://bdpapiserver.com/mercadoria/altera`, {
            method: "POST",
            body: formData
        });
        const json = await result.json();
        if (json.success) {
            window.location.reload()
        } else {
            const notification = document.getElementById("falhaAltera");
            notification.classList.remove("d-none");
            setTimeout(() => {
                notification.classList.add("d-none")
            }, 3500)
        }
    }

    async addMercadoria(e) {
        const nome = document.getElementById("nome").value;
        const precoCompra = document.getElementById("precoCompra").value;
        const precoVenda = document.getElementById("precoVenda").value;
        e.preventDefault()
        if (nome != '' || precoCompra != '' || precoVenda != '') {
            e.preventDefault();
            const token = sessionStorage.getItem("token");
            const formData = new FormData();
            formData.append("token", token);
            formData.append("nome", document.getElementById("nome").value);
            formData.append("precoCompra", document.getElementById("precoCompra").value);
            formData.append("precoVenda", document.getElementById("precoVenda").value);
            formData.append("img", document.getElementById("img").files[0])
            console.log(formData.get("nome"))
            const result = await fetch(`https://bdpapiserver.com/mercadoria`, {
                method: 'POST',
                body: formData
            })
            const json = await result.json();
            if (json.success) {
                const notification = document.getElementById("sucesso");
                notification.classList.remove("d-none");
                setTimeout(() => {
                    notification.classList.add("d-none")
                }, 3500)
            } else {
                const notification = document.getElementById("falha");
                notification.classList.remove("d-none");
                setTimeout(() => {
                    notification.classList.add("d-none")
                }, 3500)
            }
        } else {
            const notification = document.getElementById("falta");
            notification.classList.remove("d-none");
            setTimeout(() => {
                notification.classList.add("d-none")
            }, 3500)
        }
    }

    async deletarMercadoria(e) {

        const result = await fetch(`https://bdpapiserver.com/mercadoria/${e.target.getAttribute("idmercadoria")}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token"),
                "nomeimg": e.target.getAttribute("nomeimg")
            }
        });
        const json = await result.json();
        if (json.success) {
            window.location.reload();
        }
    }

    async abreAlteraMercadoria(e) {
        const resultMercadoria = await fetch(`https://bdpapiserver.com/mercadoria/${e.target.getAttribute("idmercadoria")}/${sessionStorage.getItem("token")}`);
        const jsonMercadoria = await resultMercadoria.json();
        const alteraMercadoria = document.querySelector("#alteraMercadoria");
        const lista = document.getElementById("lista-mercadorias");
        this.setState({ alteraMercadoria: jsonMercadoria.mercadoria })
        lista.classList.toggle("d-none");
        alteraMercadoria.classList.toggle("d-none")
    }

    async buscaMercadoria() {
        const inputBusca = document.querySelector("#inputBusca").value;
        const inputBuscaSm = document.querySelector(".inputBusca-sm").value;
        if (inputBusca.length > 1) {
            const result = await fetch(`https://bdpapiserver.com/mercadoria/busca/${inputBusca}/${sessionStorage.getItem("token")}`);
            const json = await result.json();
            this.setState({ mercadorias: json.mercadorias });
        } else if (inputBuscaSm.length > 1) {
            const result = await fetch(`https://bdpapiserver.com/mercadoria/busca/${inputBuscaSm}/${sessionStorage.getItem("token")}`);
            const json = await result.json();
            this.setState({ mercadorias: json.mercadorias });
        } else {
            fetch(`https://bdpapiserver.com/mercadoria/limite/${15}/${0}/${sessionStorage.getItem("token")}`)
                .then((res) => {
                    return res.json();
                }).then((res) => {
                    this.setState({ mercadorias: res.mercadoria[0] })
                });
        }
    }
    
    render() {
        return (
            <div className="col-11 col-md-10 centralizar" >
                <div className="row" id="lista-mercadorias">
                    <div className="col col-md-10 col-lg-10 centralizar">
                        <div className="row">
                            <div className="col col-lg-12 col-xl-12 col-md-12 centralizar p-lg-0 p-0 mt-4 mt-lg-5">
                                <h2 className="text-lg-right text-center text-md-right text-xl-right  pb-4 mt-4 bold texto-primario ">Mercadorias</h2>
                                <div className="row">
                                    <div className="col col-lg-5 mb-3 d-none d-md-block d-lg-block ">
                                        <input type="text" className="border-0 bg-primario p-2 d-inline inputBusca" id="inputBusca" onKeyUp={this.buscaMercadoria} />
                                        <button className="border-0 bg-primario pt-2 pb-2 pl-2 pr-3 text-white btnBusca"><i class="fas fa-search"></i></button>
                                    </div>
                                    <div className="col d-block d-lg-none d-md-none">
                                        <input type="text" className="col-8 border-0 bg-primario p-2 animate-input d-none inputBusca-sm " id="inputBusca" placeholder="Digite o nome" onKeyUp={this.buscaMercadoria} />
                                        <button className="border-0 bg-primario pt-2 pb-2 pl-3 pr-3 rounded text-white " onClick={btnBusca} id="btnBusca"><i class="fas fa-search"></i></button>
                                    </div>
                                    <div className="col">
                                        <button className="border-0 bg-secondario pt-2 pb-2 pl-3 pr-3 text-white rounded float-right d-none d-md-block d-lg-block" onClick={this.toggleCadastro}>Nova mercadoria</button>
                                        <button className="border-0 bg-secondario pt-2 pb-2 pl-3 pr-3 text-white rounded float-right d-block d-md-none d-lg-none" onClick={this.toggleCadastro}><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-xl-12 centralizar mt-4 scroll-x bg-white p-0 alturatabela ">
                                <table className="table shadow rounded h-10">
                                    <thead className="bg-primario text-white bold">
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Preço Compra (R$)</th>
                                            <th scope="col">Preço Venda (R$)</th>
                                            <th scope="col">IMG</th>
                                            <th scope="col">Alterar</th>
                                            <th scope="col">Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="regular">
                                        {this.state.mercadorias.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item.nome}</td>
                                                    <td>{formataValorBr(item.precoCompra)}</td>
                                                    <td>{formataValorBr(item.precoVenda)}</td>
                                                    <td className="texto-overflow">{item.nomeImg}</td>
                                                    <td>
                                                        <button className="btn bg-warning border-0 rounded text-white col" idmercadoria={item.id} onClick={this.abreAlteraMercadoria}>Alterar</button>
                                                    </td>
                                                    <td>
                                                        <button className="btn bg-danger border-0 rounded text-white col" idmercadoria={item.id} nomeimg={item.nomeImg} onClick={this.deletarMercadoria}>Deletar</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col p-0">
                                <button className="col col-md-2 col-lg-1 p-1 float-right mt-4 border-0 bg-primario text-white rounded mb-4" onClick={this.maisDez}>Mais 10</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <NovaMercadoria addMercadoria={() => this.addMercadoria} />
                        <AlteraMercadoria abreAltera={this.toggleAltera} mercadoria={this.state.alteraMercadoria} alteraMercadoria={this.alteraMercadoriaForm} />
                    </div>
                </div>
            </div>
        )
    }
}
