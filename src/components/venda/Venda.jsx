import React from 'react'
import NovaVenda from './novaVenda';
import { formataData, formataValorBr ,verificaNumeroInt} from '../utils'
import Logo from '../../img/Sem Título-1.png'
import '../../css/venda.css'
import DetalheVenda from './detalheVenda';

export default class Venda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listaMercadoria: [],
            carrinho: [],
            subtotal: 0.00,
            pulos: 0,
            limite: 10,
            notas: [],
            pdfMercadorias: [],
            detalheNota: [],
            detalheVendas: [],
            detalheMercadorias: []
        }
        this.procuraMercadoria = this.procuraMercadoria.bind(this);
        this.completaCampos = this.completaCampos.bind(this);
        this.calculaTotal = this.calculaTotal.bind(this);
        this.addCarrinho = this.addCarrinho.bind(this);
        this.deletarItem = this.deletarItem.bind(this);
        this.finalizaNota = this.finalizaNota.bind(this);
        this.geraPdf = this.geraPdf.bind(this);
        this.detalheVenda = this.detalheVenda.bind(this);
        this.fechaDetalheNota = this.fechaDetalheNota.bind(this);
        this.sairNovaVenda = this.sairNovaVenda.bind(this);
        this.abreProcuraPorData = this.abreProcuraPorData.bind(this);
        this.procuraNota = this.procuraNota.bind(this);
    }

    async componentDidMount() {
        const result = await fetch(`https://bdpapiserver.com/notas/limite/${this.state.limite}/${this.state.pulos}/${sessionStorage.getItem("token")}`);
        const json = await result.json();
        this.setState({ notas: json.notas[0] });
    }

    async procuraMercadoria() {
        const inputBusca = document.getElementById("inputBuscaNota").value;
        const divMercadorias = document.getElementById("listaMercadoriaBsuca");
        if (inputBusca != '' && inputBusca.length > 1) {
            divMercadorias.classList.remove("d-none")
            const result = await fetch(`https://bdpapiserver.com/mercadoria/busca/${inputBusca}/${sessionStorage.getItem("token")}`);
            const json = await result.json();
            this.setState({ listaMercadoria: json.mercadorias })
        } else {
            divMercadorias.classList.add("d-none")
            this.setState({ listaMercadoria: [] })
        }
    }

    toggleNovaNota() {
        const novaMercadoria = document.getElementById("novaMercadoria")
        const listaNotas = document.getElementById("listaNotas");
        novaMercadoria.classList.toggle("d-none");
        listaNotas.classList.toggle("d-none")
    }

    sairNovaVenda() {
        window.location.reload()
    }

    deletarItem(e) {
        let mercadoriasCarrinho = [];
        let deletedMercadorias = []
        this.state.carrinho.forEach(item => {
            if (item.id === e.target.getAttribute('idMercadoria')) {
                deletedMercadorias.push(item)
                this.setState({ subtotal: this.state.subtotal - parseFloat(item.total) })
            } else {
                mercadoriasCarrinho.push(item);
            }
        })

        this.setState({ carrinho: mercadoriasCarrinho });
    }

    async completaCampos(e) {
        let alvo = e.target;
        if (!alvo.classList.contains("divMercadoria")) {
            while (!alvo.classList.contains("divMercadoria")) {
                alvo = alvo.parentNode;
            }
        }

        const spans = Array.from(alvo.querySelectorAll("span"));
        const result = await fetch(`https://bdpapiserver.com/mercadoria/${spans[1].textContent}/${sessionStorage.getItem("token")}`);
        const json = await result.json();
        const lista = document.getElementById("listaMercadoriaBsuca");
        const nome = document.getElementById("inputBuscaNota");
        const preco = document.getElementById("precoVenda");
        const id = document.getElementById("idMercadoria");

        nome.value = json.mercadoria.nome
        preco.value = json.mercadoria.precoVenda;
        id.value = json.mercadoria.id;
        lista.classList.toggle("d-none")
    }

    async finalizaNota() {
        if (this.state.carrinho.length) {
            const result = await fetch(`https://bdpapiserver.com/notas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ total: this.state.subtotal, cliente: document.getElementById("cliente").value, token: sessionStorage.getItem("token") })
            });
            const json = await result.json();
            if (json.success) {
                this.state.carrinho.forEach(async (item) => {
                    const resultVenda = await fetch(`https://bdpapiserver.com/vendas`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id_mercadoria: item.id, quantidade: item.quantidade, notaId: json.nota.id, desconto: item.desconto, token: sessionStorage.getItem("token") })
                    });
                    const jsonVenda = await resultVenda.json();
                    window.location.reload()
                })
            }
        }
    }

    calculaTotal(e) {
        const preco = parseFloat(document.getElementById("precoVenda").value).toFixed(2);
        const desconto = parseFloat(document.getElementById("desconto").value).toFixed(2)
        const quantidade = parseInt(document.getElementById("quantidade").value);
        const total = document.getElementById("total");
        verificaNumeroInt(e)
        if (document.getElementById("quantidade").value != '' && document.getElementById("desconto").value === '') {
            
            total.value = (parseFloat(preco) * quantidade).toFixed(2);
        } else {
            total.value = (desconto * quantidade).toFixed(2);;
        }

    }

    async geraPdf(e) {
        const resultNotas = await fetch(`https://bdpapiserver.com/notas/${e.target.getAttribute('idmercadoria')}/${sessionStorage.getItem("token")}`);
        const jsonNotas = await resultNotas.json();
        const resultVendas = await fetch(`https://bdpapiserver.com/vendas/${jsonNotas.notas.id}/${sessionStorage.getItem("token")}`);
        const jsonVendas = await resultVendas.json();
        let dia = jsonNotas.notas.data.slice(8, 10);
        let mes = jsonNotas.notas.data.slice(5, 7);
        let ano = jsonNotas.notas.data.slice(0, 4);
        let dataFormated = dia + '/' + mes + '/' + ano
        let corpo = `<h3 style="text-align: center;margin-top:25px;margin-bottom:15px">Bal Dos Plasticos</h3>
        <h5 style="text-align: center">${jsonNotas.notas.cliente}</h5>
        <h5 style="text-align: center">Data: ${dataFormated}</h5>
        <table style="border:1px solid;border-collapse: collapse;font-size:10px;margin: 0 auto;">
        <thead>
            <tr>
                <td style="border:1px solid;padding:7px">Nome da mercadoria</td>
                <td style="border:1px solid;padding:7px">Preço</td>
                <td style="border:1px solid;padding:7px">Quantidade</td>
                <td style="border:1px solid;padding:7px">Desconto</td>
                <td style="border:1px solid;padding:7px">Total</td>
            </tr>   
        <thead>
        <tbody>`
        for (let i = 0; i < jsonVendas.vendas.length; i++) {
            if (jsonVendas.vendas[i].desconto < 1) {
                const resultMercadoria = await fetch("https://bdpapiserver.com/mercadoria/" + jsonVendas.vendas[i].id_mercadoria + "/" + sessionStorage.getItem('token'));
                const jsonMercadoria = await resultMercadoria.json();
                let tr = `
                <tr>
                    <td style="padding:5px;text-align:center;border:1px solid">${jsonMercadoria.mercadoria.nome}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${jsonMercadoria.mercadoria.precoVenda.replace('.', ',')}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${jsonVendas.vendas[i].quantidade}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${(parseFloat(jsonMercadoria.mercadoria.precoVenda) - parseFloat(jsonVendas[i].desconto))}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${((parseFloat(jsonMercadoria.mercadoria.precoVenda) * jsonVendas.vendas[i].quantidade) - jsonVendas.vendas[i].desconto).toFixed(2).toString().replace(".", ",")}</td>
                
                </tr> `
                corpo += tr;
            } else {
                const resultMercadoria = await fetch("https://bdpapiserver.com/mercadoria/" + jsonVendas.vendas[i].id_mercadoria + "/" + sessionStorage.getItem('token'));
                const jsonMercadoria = await resultMercadoria.json();
                let tr = `
                
                <tr>
                    <td style="padding:5px;text-align:center;border:1px solid">${jsonMercadoria.mercadoria.nome}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${jsonMercadoria.mercadoria.precoVenda.replace('.', ',')}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${jsonVendas.vendas[i].quantidade}</td>
                    <td style="padding:5px;text-align:center;border:1px solid">${((parseFloat(jsonVendas.vendas[i].desconto).toFixed(2) * jsonVendas.vendas[i].quantidade)).toFixed(2).toString().replace(".", ",")}</td>
                </tr> `
                corpo += tr;
            }
        }

        corpo += `
            </tbody>
            </table>
            <h5 style="margin-top:30px;text-align:center">Subtotal: ${parseFloat(jsonNotas.notas.total).toFixed(2).toString().replace(".", ",")}</h5>
            `
        const result = fetch("https://bdpapiserver.com/notas/pdf", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: sessionStorage.getItem('token'), corpo: corpo })
        }).then(result => {
            return result.json();
        }).then(result => {
            if (result.success) {
                setTimeout(() => {
                    window.open("https://bdpapiserver.com/pdfnota.pdf")
                }, 3000)
            }
        })
    }

    calculaDesconto(e) {
        const total = document.getElementById("total");
        if (e.target.value != '') {
            const quantidade = parseInt(document.getElementById("quantidade").value);
            total.value = (quantidade * parseFloat(e.target.value.replace(",","."))).toFixed(2)
        } else {
            const preco = parseFloat(document.getElementById("precoVenda").value).toFixed(2);
            const quantidade = parseInt(document.getElementById("quantidade").value);
            total.value = (preco * quantidade).toFixed(2)
        }
    }

    addCarrinho() {
        const preco = document.getElementById("precoVenda")
        const total = document.getElementById("total")
        const quantidade = document.getElementById("quantidade")
        const desconto = document.getElementById("desconto")
        const inputBusca = document.getElementById("inputBuscaNota")
        const idMercadoria = document.getElementById("idMercadoria")
        if (preco != '' && total != '' && quantidade != '' && desconto != '' && inputBusca != '') {

            const mercadoria = { id: idMercadoria.value, nome: inputBusca.value, precoVenda: preco.value, quantidade: quantidade.value, desconto: desconto.value, total: total.value }
            this.setState({ carrinho: this.state.carrinho.concat(mercadoria) })
            this.setState({ subtotal: this.state.subtotal + parseFloat(total.value) })
            preco.value = ''
            total.value = ''
            quantidade.value = ''
            desconto.value = ''
            inputBusca.value = ''
            idMercadoria.value = ''

        } else {
            console.log("alururururu")
        }
    }

    async detalheVenda(e) {
        this.setState({ detalheMercadorias: [], detalheVendas: [], detalheNota: [] })
        const result = await fetch(`https://bdpapiserver.com/notas/${e.target.getAttribute("idmercadoria")}/${sessionStorage.getItem("token")}`);
        const json = await result.json();
        const resultVendas = await fetch(`https://bdpapiserver.com/vendas/${json.notas.id}/${sessionStorage.getItem("token")}`);
        const jsonVendas = await resultVendas.json();
        jsonVendas.vendas.forEach(async (item) => {
            const resultMercadorias = await fetch(`https://bdpapiserver.com/mercadoria/${item.id_mercadoria}/${sessionStorage.getItem("token")}`)
            const jsonMercadorias = await resultMercadorias.json();
            this.setState({ detalheMercadorias: this.state.detalheMercadorias.concat(jsonMercadorias.mercadoria) })
        })
        this.setState({ detalheVendas: jsonVendas.vendas, detalheNota: json.notas });
        const listaNotas = document.getElementById("listaNotas");
        const detalheNota = document.getElementById("detalheVenda");
        listaNotas.classList.toggle("d-none")
        detalheNota.classList.toggle("d-none")

    }

    fechaDetalheNota() {
        const listaNotas = document.getElementById("listaNotas");
        const detalheNota = document.getElementById("detalheVenda");
        detalheNota.classList.toggle("d-none");
        listaNotas.classList.toggle("d-none")
    }

    abreProcuraPorData(){
        const listaElementos = document.querySelectorAll("#buscaElementos")
        const btnCalendar = document.querySelector("#btnCalendar");
        const btnTimes = document.querySelector("#btnTimes");
        const btnNova = document.querySelector("#btnNova");
        btnNova.classList.toggle("d-none")
        btnCalendar.classList.toggle("d-none")
        btnTimes.classList.toggle("d-none")
        Array.from(listaElementos).forEach(item => {
            item.classList.toggle("d-none")
        });

    }

    async procuraNota(){
        const dataInicial = document.getElementById("inputDataInicial");
        const dataFinal = document.getElementById("inputDataFinal");
        if(dataInicial.value != '' && dataFinal.value != ''){
            const result = await fetch(`https://bdpapiserver.com/notas/${dataInicial.value}/${dataFinal.value}/${sessionStorage.getItem("token")}`);
            const json = await result.json();
            this.setState({notas: json.notas})
        }
    }

    render() {
        return (
            <div className="col ">
                <div className="row" id="listaNotas">
                    <div className="col col-md-10 centralizar">
                        <div className="row">
                            <div className="col-11 centralizar p-lg-0 mt-4 mt-lg-5">
                                <h2 className="text-lg-right text-center text-md-right text-xl-right pb-4 mt-4 bold texto-primario ">Vendas</h2>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-10 col-lg-11 centralizar">
                                <div className="row">
                                    <div className="col-6 col-md-3 col-lg-2 col-lg-2 p-0 centralizar d-none d-lg-block" id="buscaElementos">
                                        <input type="date" className="form-control col-12" id="inputDataInicial"/>
                                    </div>
                                    <div className="col-6 col-md-3 col-lg-2 p-0 centralizar d-none d-lg-block" id="buscaElementos">
                                        <input type="date" className="form-control ml-0 ml-lg-3 ml-md-3" id="inputDataFinal"/>
                                    </div>
                                    <div className="col-12 col-md-1 col-lg-2 p-0 ml-0 mt-3 mt-lg-0 ml-lg-5  d-none d-lg-block" id="buscaElementos">
                                    <button className="border-0 bg-danger pt-2 pb-2 pl-3 pr-3 rounded text-white d-none d-lg-none d-md-none" id="btnTimes" onClick={this.abreProcuraPorData}><i class="fas fa-times"></i></button>
                                        <button className="btn btn-primary float-right float-lg-none" onClick={this.procuraNota}>Buscar</button>
                                    </div>
                                    <div className="col p-0 mt-3 mt-lg-0 mt-md-0 d-block d-lg-none d-md-none">
                                        <button className="border-0 bg-primario pt-2 pb-2 pl-3 pr-3 rounded text-white " id="btnCalendar" onClick={this.abreProcuraPorData}><i class="fas fa-calendar"></i></button>
                                        
                                    </div>
                                    <div className="col p-0 mt-3 mt-lg-0 mt-md-0 ">
                                        <button className="float-lg-right btn btn-success float-right" onClick={this.toggleNovaNota} id="btnNova">Nova</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col-11 col-lg-12 col-md-12 p-0 scroll-x alturatabela centralizar">
                                <table className="table col-11 centralizar regular ">
                                    <thead className="bg-primario text-white bold">
                                        <tr>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Data</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Açoes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.notas.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item.cliente}</td>
                                                    <td>{formataData(item.data)}</td>
                                                    <td>{formataValorBr(item.total)}</td>
                                                    <td>
                                                        <button className="btn btn-primary d-inline" onClick={this.detalheVenda} idmercadoria={item.id}>Detalhe</button>
                                                        <button className="btn btn-primary d-inline col-lg-3 col-md-6 col-12 mt-3 mt-md-0 ml-md-1 mt-lg-0 ml-lg-3" idmercadoria={item.id} onClick={this.geraPdf}>PDF</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <NovaVenda toggleNovaNota={this.sairNovaVenda} subtotal={this.state.subtotal} finalizaNota={this.finalizaNota} deletaItem={(e) => this.deletarItem} addCarrinho={this.addCarrinho} mercadoriaSeach={this.state.listaMercadoria} calculaDesconto={(e) => this.calculaDesconto} procuraMercadoria={this.procuraMercadoria} completaCampos={(e) => this.completaCampos} carrinho={this.state.carrinho} calculaTotal={(e) => this.calculaTotal} />
                </div>
                <div className="row">
                    <DetalheVenda nota={this.state.detalheNota} vendas={this.state.detalheVendas} mercadorias={this.state.detalheMercadorias} fechaDetalheVenda={this.fechaDetalheNota} />
                </div>
            </div>

        )
    }
}