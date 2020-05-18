import React, {Component} from 'react';
import ListMilkingsComponent from './ListMilkingsComponent';
import MilkingComponent from './MilkingComponent';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Clock from "./Clock";

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h2>Ваня всё кушает!</h2>
                    <div className="clock">
                        <Clock/>
                    </div>
                    <Switch>
                        <Route path="/" exact component={ListMilkingsComponent}/>
                        <Route path="/milkings" exact component={ListMilkingsComponent}/>
                        <Route path="/milkings/:id" component={MilkingComponent}/>
                    </Switch>
                </>
            </Router>
        )
    }
}

export default InstructorApp