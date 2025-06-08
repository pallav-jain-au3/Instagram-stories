import React, { useState, useEffect, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            console.error('Uncaught error:', error);
            setHasError(true);
            setError(error.error);
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        return (
            <div className="error-boundary">
                <h2>Something went wrong</h2>
                <p>{error?.message}</p>
                <button
                    onClick={() => {
                        setHasError(false);
                        setError(null);
                    }}
                    className="retry-button"
                >
                    Try again
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default ErrorBoundary; 