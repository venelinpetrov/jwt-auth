import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import { AuthRoute } from './components/AuthRoute.tsx';
import { LoginForm } from './components/LoginForm.tsx';
import { Profile } from './components/Profile.tsx';
import { store as reduxStore } from './utils/store/store.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReduxProvider store={reduxStore}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="*" element={<AuthRoute />}>
						<Route path="profile" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ReduxProvider>
	</StrictMode>
);
