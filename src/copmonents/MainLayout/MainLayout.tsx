import React from 'react';

interface Children {
    children: React.ReactNode
}

export const MainLayout = ({children}: Children) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to bottom, #1e2634, #1e2634, #151b25, #0f131a, #050b14)`,
        }}>
            {children}
        </div>
    );
};

