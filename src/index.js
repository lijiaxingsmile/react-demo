import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContext from './context/UserContext';
import { HashRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<ConfigProvider locale={zhCN}>
			<QueryClientProvider client={queryClient}>
				<HashRouter>
					<UserContext>
						<App />
					</UserContext>
				</HashRouter>
			</QueryClientProvider>
		</ConfigProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
