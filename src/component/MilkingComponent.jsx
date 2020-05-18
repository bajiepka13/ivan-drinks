import {Component} from "react";
import React from 'react'
import MilkingDataService from "./MilkingDataService";
import {Formik, Form, Field, ErrorMessage} from "formik";

const CHILD = 'ivan'

class MilkingComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        MilkingDataService.retrieveMilking(CHILD, this.state.id)
            .then(Response => this.setState({
                description: Response.data.description
            }))
    }

    onSubmit(values) {
        let child = CHILD;
        let milking = {
            id: this.state.id,
            description: values.description,
            milkedAt: values.targetDate
        }

        console.log(milking);

        if (this.state.id === -1) {
            MilkingDataService.createMilking(child, milking)
                .then(() => this.props.history.push('/milkings'))
        } else {
            MilkingDataService.updateMilking(child, this.state.id, milking)
                .then(() => this.props.history.push('/milkings'))
        }
        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Введите описание'
        } else if (values.description.length < 5) {
            errors.description = 'Длина описания не может быть меньше пяти символов'
        }
        return errors
    }

    render() {

        let {description, id} = this.state

        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik initialValues={{id, description}}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Номер</label>
                                        <Field className="form-control" type="text" name="id" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Описание</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Сохранить</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default MilkingComponent