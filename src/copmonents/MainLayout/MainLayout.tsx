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


//Синеватый `linear-gradient(to bottom,  #1f2937, #181f26)`
//Синий `linear-gradient(to bottom,  #161d30, #161d30)`