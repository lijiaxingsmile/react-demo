import { Button } from 'antd/lib/radio';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Sample() {
	const { x, o } = useSpring({
		from: {
			x: 0,

			o: 0,
		},
		x: 100,

		o: 1,
	});

	const [style, animate] = useSpring(
		{
			x: 0,
			config: {
				duration: 3000,
			},
			onRest(...args) {
				console.log('onRest:', args);
			},
		},
		[],
	);

	const [transfromX, setTransformX] = useState(0);

	useEffect(() => {
		animate.start({ x: transfromX });
	}, [transfromX]);

	const onStart = () => {
		setTransformX((x) => {
			return x >= 700 ? 100 : x + 100;
		});
	};

	return (
		<>
			<animated.div
				className="box"
				style={{
					x,
					opacity: o,
				}}
			></animated.div>

			<animated.div className="box" style={style}>
				<Button onClick={onStart}>手动控制</Button>
			</animated.div>
		</>
	);
}
