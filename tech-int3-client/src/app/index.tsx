import '@mantine/core/styles.css';
import './styles/index.css';

import { AppProviders } from '@/app/providers/AppProvider';
import { AppRouter } from '@/app/providers/router';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
