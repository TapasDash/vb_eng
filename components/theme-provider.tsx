'use client';

import * as React from 'react';

interface VibeContextType {
  vibeLevel: number;
  setVibeLevel: (level: number) => void;
}

const VibeContext = React.createContext<VibeContextType>({
  vibeLevel: 25, // default starting level (Quiet Guy)
  setVibeLevel: () => {},
});

export function useVibe() {
  return React.useContext(VibeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [vibeLevel, setVibeLevel] = React.useState(25);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-loud', 'theme-cyber-rave');

    if (vibeLevel > 79) {
      root.classList.add('theme-cyber-rave');
    } else if (vibeLevel > 40) {
      root.classList.add('theme-loud');
    }
  }, [vibeLevel]);

  return (
    <VibeContext.Provider value={{ vibeLevel, setVibeLevel }}>
      {children}
    </VibeContext.Provider>
  );
}
