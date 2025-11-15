import '@mantine/core/styles.css';
import './styles/index.css';

import { AppProviders } from '@/app/providers/AppProvider';
import { AppRouter } from '@/app/providers/router';
import { Layout } from '@/app/ui/Layout';

function App() {
  return (
    <AppProviders>
      <Layout>
        <AppRouter />
      </Layout>
    </AppProviders>
  );
}

export default App;
