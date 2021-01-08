import React from "react";
import s from './Footer.module.css'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>

                Ukraine. L'viv. Time right now: <span className={s.time}>{this.state.date.toLocaleTimeString()}</span>
            </div>
        );
    }
}

export default Clock