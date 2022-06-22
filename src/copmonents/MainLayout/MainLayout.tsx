import React from 'react';

interface Children {
    children: React.ReactNode
}

export const MainLayout = ({children}: Children) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '100vh',
            backgroundImage: `linear-gradient(to bottom,  #262b36, #191d24)`
        }}>
            {children}
        </div>
    );
};
