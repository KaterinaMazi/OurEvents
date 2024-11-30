import React, { useEffect } from 'react';

const Background = () => {
    const styles = {
        container: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#123',
            font: '5vmin/1.3 Serif',
            overflow: 'hidden',
            zIndex: 0,
            color: 'transparent',
        },
        dot: (x, y, color, delay, duration) => ({
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '3em',
            height: '3em',
            content: "'.'",
            mixBlendMode: 'screen',
            animation: `move ${duration}s ${delay}s infinite ease-in-out alternate`,
            textShadow: `${x}em ${y}em 7px ${color}`,
        }),
    };

    const createDots = (count) => {
        const dots = [];
        for (let i = 0; i < count; i++) {
            const randomX = (-0.5 + Math.random() * 3).toFixed(2);
            const randomY = (-0.5 + Math.random() * 3).toFixed(2);
            const randomHue = Math.floor(Math.random() * 360);
            const randomColor = `hsla(${randomHue}, 100%, 50%, 0.9)`;
            const randomDuration = (40 + Math.random() * 10).toFixed(2);
            const randomDelay = (-30 + Math.random() * 10).toFixed(2);

            dots.push(
                <div
                    key={i}
                    style={styles.dot(randomX, randomY, randomColor, randomDelay, randomDuration)}
                >
                    .
                </div>
            );
        }
        return dots;
    };

    const keyframes = `
        @keyframes move {
            from {
                transform: rotate(0deg) scale(12) translateX(-20px);
            }
            to {
                transform: rotate(360deg) scale(18) translateX(20px);
            }
        }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <div style={styles.container}>
                {createDots(40)}
            </div>
        </>
    );
};

export default Background;
