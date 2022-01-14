import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { animated, useSpring, useSpringRef, useTransition } from 'react-spring';

export default function Chain() {
	const ref = useSpringRef();
	const [props1, animate] = useSpring(
		{
			x: 0,
			y: 0,
		},
		[],
	);
	const onStart = async () => {
		const [result] = animate.start((...args) => {
			console.log('args:', args);
			return { x: 100 };
		});
		await result;
		animate.start({ y: 100 });
	};

	return (
		<>
			<animated.div className="box" style={props1} onClick={onStart}>
				chain
			</animated.div>
		</>
	);
}
