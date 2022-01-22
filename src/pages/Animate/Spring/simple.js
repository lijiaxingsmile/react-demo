import { Button } from 'antd';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
export default function Sample() {
	// const [targetNumber, setNumber] = useState(0);

	const props = useSpring({
		to: {
			opacity: 1,
		},
		from: {
			opacity: 0,
		},
	});

	const { number } = useSpring({
		from: {
			number: 0,
		},
		number: 100,
	});

	return (
		<div className="container">
			<animated.div style={props}>
				<h1>hello,spring</h1>
			</animated.div>

			<animated.div>
				{number.to((v) => parseInt(v))}
				{/* <Button onClick={setNumber(100)}>设置数字100</Button> */}
			</animated.div>
		</div>
	);
}
