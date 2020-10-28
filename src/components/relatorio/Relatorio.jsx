import React from 'react'

export default class Relatorio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalHoje: 0.00,
            notasHoje: 0,
            lucroHoje: 0.00
        }
    }

    async componentDidMount() {
        let today = new Date().toISOString().slice(0, 10)
        const result = await fetch(`https://bdpapiserver.com/notas/${today}/${today}/${sessionStorage.getItem("token")}`);
        const json = await result.json();
        json.notas.forEach(item => {
            this.setState({ totalHoje: this.state.totalHoje + parseFloat(item.total) })
        })
        this.setState({notasHoje: json.notas.length})
    }

    render() {
        return (
            <div className="col-11 col-md-10 centralizar" >
                <div className="row" id="lista-mercadorias">
                    <div className="col col-md-10 col-lg-10 centralizar">
                        <div className="row">
                            <div className="col col-lg-8 col-md-12 centralizar p-lg-0 p-0 mt-4 mt-lg-5">
                                <h2 className="text-center pb-4 mt-4 bold  ">Resumo Hoje</h2>
                                <div className="row mt-4">
                                    <div className="col-12 col-md-4 col-lg-4 mt-1 mt-lg-0 text-center">
                                        <h4>Notas: {this.state.notasHoje}</h4>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 mt-5 mt-lg-0 text-center">
                                        <h4>Total: {parseFloat(this.state.totalHoje).toFixed(2)}</h4>
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 mt-5 mt-lg-0 text-center">
                                        <h4>Lucro: {parseFloat(this.state.lucroHoje).toFixed(2)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}