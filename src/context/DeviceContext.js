import React, { useEffect, useMemo } from 'react';
import { useWindowSize } from 'react-use';

const DeviceContext = React.createContext();

export const DeviceContextProvider = ({ children }) => {
	const [deviceType, setDeviceType] = React.useState('pc');
	const { width } = useWindowSize();

	const isMobile = useMemo(() => deviceType === 'mobile', [deviceType]);
	const isPC = useMemo(() => deviceType === 'pc', [deviceType]);

	useEffect(() => {
		if (width > 768) {
			setDeviceType('pc');
		} else {
			setDeviceType('mobile');
		}
	}, [width]);

	return (
		<DeviceContext.Provider value={{ deviceType, isMobile, isPC }}>
			{children}
		</DeviceContext.Provider>
	);
};

export const useDevice = () => {
	const device = React.useContext(DeviceContext);
	return device;
};
