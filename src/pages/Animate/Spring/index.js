import Sample from './simple';
import Chain from './chain';
import Slide from './slide';
import Transition from './transition';

import './index.less';

export default function Spring() {
	return (
		<div className="spring-container">
			{/* <Sample /> */}
			{/* <Chain /> */}
			{/* <Slide /> */}
			<Transition />
		</div>
	);
}
