import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import App from './App.tsx';
import { store as reduxStore } from './utils/store/store.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReduxProvider store={reduxStore}>
			<App />
		</ReduxProvider>
	</StrictMode>
);
