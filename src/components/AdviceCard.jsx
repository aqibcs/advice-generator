import React, { useEffect, useState } from 'react';
import divider from "../assets/pattern-divider-desktop.svg";
import diceIcon from "../assets/icon-dice.svg";

const AdviceCard = () => {
    const [advice, setAdvice] = useState('');
    const [adviceId, setAdviceId] = useState('');

    const fetchAdvice = async () => {
        try {
            const response = await fetch("https://api.adviceslip.com/advice", { cache: 'no-cache'});
            const data = await response.json()
            setAdvice(data.slip.advice)
            setAdviceId(data.slip.id)
        } catch (error) {
            setAdvice('Failed to fetch advice. Please try again.')
            setAdviceId('')
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAdvice()
    }, [])

    return (
        <div className="container">
            <div className="card">
                <p className="advice-id">
                    ADVICE #{adviceId}
                </p>
                <blockquote className="quote">"{advice}"</blockquote>
                <img src={divider} alt="Divider" className="divider-img" />
                <button className="dice-btn" onClick={fetchAdvice} aria-label="Get new advice">
                    <img src={diceIcon} alt="" role="presentation" />
                </button>
            </div>
        </div>
    )
}

export default AdviceCard