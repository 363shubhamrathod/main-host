import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';

const RApp = lazy(() => import("music_library_ui_remote_components/App"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Music Library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-app">
      <Suspense fallback={
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Music Library Module...</p>
          </div>
        </div>
      }>
        <RApp />
      </Suspense>
    </div>
  );
}

export default App;
