import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Switch: {
              trackHeight: 24,
              trackMinWidth: 60,
              handleSize: 21,
            },
          },
        }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
