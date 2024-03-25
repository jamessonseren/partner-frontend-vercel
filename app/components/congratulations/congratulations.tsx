import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import React from 'react'

const Congratulations = () => {
    const { width, height } = useWindowSize()

    return (
        <Confetti
            width={width}
            height={height}
        />
    )
}

export default Congratulations;