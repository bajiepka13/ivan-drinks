import {Component} from "react"
import React from 'react'
import MilkingDataService from "./MilkingDataService"
import Clock from "./Clock"

class ListMilkingsComponent extends Component {

    constructor(props) {
        super(props)
        this.refreshMilkings = this.refreshMilkings.bind(this)
        this.deleteMilkingClicked = this.deleteMilkingClicked.bind(this)
        this.updateMilkingClicked = this.updateMilkingClicked.bind(this)
        this.addMilkingClicked = this.addMilkingClicked.bind(this)
        this.state = {
            milks: [],
            message: null
        }
    }

    componentDidMount() {
        this.refreshMilkings();
    }

    refreshMilkings() {
        MilkingDataService.retrieveAllMilkings('ivan')
            .then(
                response => {
                    console.log(response);
                    this.setState({milks: response.data})
                }
            )
    }

    deleteMilkingClicked(id) {
        MilkingDataService.deleteMilking('ivan', id)
            .then(
                response => {
                    this.setState({message: `Запись ${id} удалена`})
                    this.refreshCourses()
                }
            )

    }

    updateMilkingClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/milkings/${id}`)
        MilkingDataService.updateMilking('ivan', id)
             .then(
                 response => {
                     this.setState({message: `Запись ${id} изменена`})
                     this.refreshCourses()
                 }
             )
    }

    addMilkingClicked() {
        this.props.history.push(`/milkings/-1`)
    }

    render() {
        return (
            <div className="container">
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Кормили:</th>
                            <th>Предыдущее:</th>
                            <th>Прошло, м:</th>
                            <th>Описание:</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.milks.map(
                                milk =>
                                    <tr key={milk.id}>
                                        <td>{milk.id}</td>
                                        <td>{milk.milkedAt}</td>
                                        <td>{milk.lastMilking}</td>
                                        <td>{milk.milkingDelay}</td>
                                        <td>{milk.description}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateMilkingClicked(milk.id)}> Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.deleteMilkingClicked(milk.id)}> Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addMilkingClicked}> Добавить</button>
                </div>
            </div>
        )
    }
}

export default ListMilkingsComponent