import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { QueryClient, QueryClientProvider } from 'react-query';

import { UserContextProvider } from './UserContext';
import { DeviceContextProvider } from './DeviceContext';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: false,
		},
	},
});

export default function Context({ children }) {
	return (
		<>
			<ConfigProvider locale={zhCN}>
				<QueryClientProvider client={queryClient}>
					<HashRouter>
						<UserContextProvider>
							<DeviceContextProvider>
								{children}
								<ReactQueryDevtools />
							</DeviceContextProvider>
						</UserContextProvider>
					</HashRouter>
				</QueryClientProvider>
			</ConfigProvider>
		</>
	);
}

export * from './UserContext';
export * from './DeviceContext';
