import React, {useEffect, useState} from "react";

const Timer = () => {

    const [counter, setCounter] = useState<number>(0);
    const [stop, setStop] = useState<number>(0);
    const [footerText, setFooterText] = useState<string[]>([]);

    useEffect(() => {
        const timer = !stop ? setInterval(() =>
            setCounter(counter + 1), 1000) : counter;
        return () => clearInterval(timer);
    }, [counter, stop]);

    const convertHMS = (value: number) => {
        const sec = parseInt(String(value), 10);
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);
        return (minutes < 10 ? "0" + minutes : minutes) + ':' + (seconds < 10 ? "0" + seconds : seconds);
    };

    const stopBtn = () => {
        setStop(counter);
        setFooterText([...footerText, `stopped at ${convertHMS(counter as number)}`])
    };

    const continueBtn = () => {
        setStop(0);
        stop && setFooterText([...footerText, "continued"])
    };

    const resetBtn = () => {
        setCounter(0);
        setStop(0);
        setFooterText([])
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="timer">
                    {convertHMS(counter as number)}
                </div>
                <div className="buttons">
                    <button className="button" onClick={stopBtn}>Stop</button>
                    <button className="button" onClick={continueBtn}>Continue</button>
                    <button className="button" onClick={resetBtn}>Reset</button>
                </div>
                <div className="footerText">
                    {
                        footerText?.length ? footerText.map((item, index) => {
                            return <p key={index}>{item}</p>
                        }) : ""
                    }
                </div>
            </header>
        </div>
    );
};

export default Timer;