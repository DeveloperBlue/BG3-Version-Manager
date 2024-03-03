import React from 'react';
import ReactDOM from 'react-dom/client';

import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

import {
	NextUIProvider
} from "@nextui-org/react";

import store from '@redux/store'
import { Provider } from 'react-redux'

import ApplicationSettingsProvider from '@components/ApplicationSettingsProvider/ApplicationSettingsProvider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  	<React.StrictMode>
		<NextUIProvider>
			<Provider store={store}>
				<ApplicationSettingsProvider>
					<App />
				</ApplicationSettingsProvider>
			</Provider>
		</NextUIProvider>
	</React.StrictMode>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
	// eslint-disable-next-line no-console
	console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
