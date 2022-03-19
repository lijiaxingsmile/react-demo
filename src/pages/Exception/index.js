import { useParams, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { useCallback, useMemo } from 'react';
import Exception404 from './NotFound';

export default function Exception({ code }) {
	const params = useParams();
	const navigate = useNavigate();

	const Outlet = useMemo(() => {
		const realCode = code ?? params.code;
		let component = null;
		switch (realCode) {
			case 404:
			case '404':
				component = Exception404;
				break;
			default:
				break;
		}
		return component;
	}, [params, code]);

	const pageBack = useCallback(() => navigate(-1), [navigate]);
	const pageHome = useCallback(() => navigate('/'), [navigate]);

	const extra = useMemo(() => {
		return (
			<Space size="large">
				<Button type="primary" onClick={pageBack}>
					上一页
				</Button>
				<Button type="primary" onClick={pageHome}>
					返回首页
				</Button>
			</Space>
		);
	}, [pageHome, pageBack]);

	if (!Outlet) return null;

	return (
		<div className="exception-page h-full">
			<Outlet extra={extra} />
		</div>
	);
}
