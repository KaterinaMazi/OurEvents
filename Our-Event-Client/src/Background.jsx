import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const blurCanvas = document.createElement('canvas');
        const blurCtx = blurCanvas.getContext('2d');
        blurCanvas.width = canvas.width;
        blurCanvas.height = canvas.height;

        const dots = Array.from({ length: 10 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 100 + 50, // Large dot size (50px to 150px)
            color: `hsla(${Math.random() * 360}, 50%, 50%, 0.6)`, // Soft, translucent color
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.5 + 0.1, // Slow movement
        }));

        const updateDots = () => {
            dots.forEach(dot => {
                dot.x += Math.cos(dot.angle) * dot.speed;
                dot.y += Math.sin(dot.angle) * dot.speed;

                // Wrap around edges
                if (dot.x > canvas.width) dot.x = 0;
                if (dot.x < 0) dot.x = canvas.width;
                if (dot.y > canvas.height) dot.y = 0;
                if (dot.y < 0) dot.y = canvas.height;

                dot.angle += 0.01; // Gradual direction change
            });
        };

        const drawDots = () => {
            // Clear both canvases
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);

            // Draw dots on the blur canvas
            dots.forEach(dot => {
                blurCtx.beginPath();
                blurCtx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                blurCtx.fillStyle = dot.color;
                blurCtx.fill();
            });

            // Apply blur effect using filter
            blurCtx.filter = 'blur(40px)'; // Adjust for stronger blur
            blurCtx.drawImage(blurCanvas, 0, 0);

            // Composite blurred dots onto the main canvas
            ctx.drawImage(blurCanvas, 0, 0);
        };

        const animate = () => {
            updateDots();
            drawDots();
            requestAnimationFrame(animate);
        };

        animate();

        // Handle resizing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            blurCanvas.width = canvas.width;
            blurCanvas.height = canvas.height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: '#123',
            }}
        />
    );
};

export default BackgroundCanvas