import { Button } from 'antd/lib/radio';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';

export default function Transition() {
	const [show, setShow] = useState(false);

	const transitions = useTransition(show, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	return (
		<div className="box">
			<Button onClick={() => setShow(!show)}>切换</Button>
			{transitions(
				({ opacity }, item) =>
					item && <animated.div style={{ opacity }}>过渡</animated.div>,
			)}
		</div>
	);
}
