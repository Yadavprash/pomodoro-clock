import React from 'react';
import './styles.css'
import {connect} from "react-redux";
import {
    decrementBreakLength,
    incrementBreakLength,
    incrementSessionLength,
    decrementSessionLength,
    setLabel, reset
} from "./reducer";

import beep from './sounds/beep.wav';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeInSeconds: this.props.sessionLength * 60,
            isTimerRunning: false
        }
        this.audioRef = React.createRef();
        this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
        this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
        this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
        this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset() {
        this.audioRef.current.load();
        this.props.rst();
        this.setState({
            timeInSeconds: this.props.sessionLength * 60,
            isTimerRunning: false
        })
        clearInterval(this.countdown);

    }

    startTimer = () => {

        if (this.state.isTimerRunning) {
            clearInterval(this.countdown);
            this.setState({isTimerRunning: false});
        } else {
            this.setState({isTimerRunning: true}, () => {
                this.countdown = setInterval(() => {
                    this.setState(prevState => ({
                        timeInSeconds: prevState.timeInSeconds - 1
                    }), () => {
                        if (this.state.timeInSeconds < 0) {
                            this.audioRef.current.play();
                            if (this.props.label === 'Session') {
                                this.setBreak();
                            } else this.setSession();
                        }
                    });
                }, 1000);
            });
        }
    };
    setBreak = () => {
        this.setState({
            timeInSeconds: this.props.breakLength * 60,
        })
        this.props.stLb();
        console.log(this.state)
    }
    setSession = () => {
        this.setState({
            timeInSeconds: this.props.sessionLength * 60,
        })
        this.props.stLb();
        console.log(this.state)

    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }

    handleBreakIncrement() {
        if (!this.state.isTimerRunning)
            this.props.incrBrLen();
    }

    handleBreakDecrement() {
        if (!this.state.isTimerRunning)
            this.props.decrBrLen();
    }

    handleSessionIncrement() {
        if (!this.state.isTimerRunning) {
            this.props.incrSsLen();
            this.setTimeInSec();
        }
    }

    handleSessionDecrement() {
        if (!this.state.isTimerRunning) {
            this.props.decrSsLen();
            this.setTimeInSec()
        }
    }

    setTimeInSec() {
        this.setState({timeInSeconds: this.props.sessionLength * 60})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sessionLength !== this.props.sessionLength) {
            this.setState({timeInSeconds: this.props.sessionLength * 60})
        }
    }

    render() {
        const {breakLength, sessionLength, label} = this.props;
        const {timeInSeconds} = this.state;
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return (
            <div id='mainContainer'>
                <h1>POMODORO CLOCK</h1>
                <div id='container1'>
                    <div id='ct1Left'>
                        <h2 className='left' id='break-label'>Break Length</h2>
                        <div className='left' onClick={this.handleBreakIncrement} id='break-increment'><i
                            className="fa-sharp fa-solid fa-arrow-up fa-lg"></i></div>
                        <div className='left' id='break-length'>{breakLength}</div>
                        <div className='left' onClick={this.handleBreakDecrement} id='break-decrement'><i
                            className="fa-sharp fa-solid fa-arrow-down fa-lg"></i></div>

                    </div>
                    <div id='ct1Right'>
                        <h2 className='right' id='session-label'>Session Length</h2>
                        <div className='right' onClick={this.handleSessionIncrement} id='session-increment'><i
                            className="fa-sharp fa-solid fa-arrow-up fa-lg"></i></div>
                        <div className='right' id='session-length'>{sessionLength}</div>
                        <div className='right' onClick={this.handleSessionDecrement} id='session-decrement'><i
                            className="fa-sharp fa-solid fa-arrow-down fa-lg"></i></div>
                    </div>
                </div>
                <div id='container2'>
                    <h2 id='timer-label'>{label}</h2>
                    <div id='time-left'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
                    <audio ref={this.audioRef} id='beep' src={beep}></audio>
                </div>
                <div id='container3'>
                    <button id='start_stop' onClick={this.startTimer} disabled={this.isTimerRunning}><i
                        className="fa-sharp fa-solid fa-play fa-lg"></i></button>
                    <div id='reset' onClick={this.handleReset}><i className="fa-solid fa-arrow-rotate-right fa-lg"></i>
                    </div>
                </div>
                <h4>Design and Coded By</h4>
                <a href='https://github.com/Yadavprash' target='_blank'><h4>Yadavprash</h4></a>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        breakLength: state.breakLength,
        sessionLength: state.sessionLength,
        label: state.label
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        incrBrLen: () => {
            dispatch(incrementBreakLength());
        },
        decrBrLen: () => {
            dispatch(decrementBreakLength());
        },
        incrSsLen: () => {
            dispatch(incrementSessionLength());
        },
        decrSsLen: () => {
            dispatch(decrementSessionLength());
        },
        stLb: () => {
            dispatch(setLabel());
        },
        rst: () => {
            dispatch(reset())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);