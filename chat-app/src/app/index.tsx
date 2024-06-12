import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SystemProvider } from '@/providers/SystemProvider';
import { ThemeProviderContainer } from '@/providers/ThemeProviderContainer';
import { router } from './router';

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

export function App() {
  return (
    <ThemeProviderContainer>
      <SystemProvider>
        <RouterProvider router={router} />
      </SystemProvider>
    </ThemeProviderContainer>
  );
}
