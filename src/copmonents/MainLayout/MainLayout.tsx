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
            backgroundColor: '#161d30'
        }}>
            {children}
        </div>
    );
};
