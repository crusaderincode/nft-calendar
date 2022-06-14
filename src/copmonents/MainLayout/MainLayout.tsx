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
        }}>
            {children}
        </div>
    );
};

