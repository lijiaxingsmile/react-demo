import { useState, useRef } from 'react';
import { animated, useSpring } from 'react-spring';

export default function Slide() {
	const [active, setActive] = useState(false);
	const [x, setX] = useState(0);
	const xRef = useRef();

	const props = useSpring({
		x: active ? x : 0,
		scale: active ? 1.1 : 1,
	});

	const onTouchStart = (event) => {
		setActive(true);
		const [target] = event.touches;
		xRef.current = target.clientX;
	};

	const onTouchMove = (event) => {
		const [target] = event.touches;
		const x = target.clientX;
		setX(x - xRef.current);
	};

	const onTouchEnd = () => {
		setActive(false);
		setX(0);
	};

	return (
		<animated.div
			style={props}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			className="box"
		>
			滑动
		</animated.div>
	);
}
