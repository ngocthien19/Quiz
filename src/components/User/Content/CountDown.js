import { useState, useEffect } from "react"

function CountDown({ onTimeUp }) {

    const [count, setCount] = useState(500)

    const toHHMMSS = (secs) => {
        const sec_sum = parseInt(secs, 10)
        const h = Math.floor(sec_sum / 3600)
        const m = Math.floor(sec_sum / 60) % 60
        const s = sec_sum % 60
        return [h, m, s]
            .map(v => v < 10 ? '0' + v : v)
            .filter((v, i) => v !== '00' || i > 0)
            .join(":")
    }

    useEffect(() => {
        if (count === 0) {
            onTimeUp()
            return
        }
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [count])

    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}

export default CountDown