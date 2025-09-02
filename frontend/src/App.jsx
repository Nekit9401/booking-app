import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import { ErrorNotification, MainLayout } from './components';
import { ProtectedRoute } from './components';
import { AdminRoute } from './components';
import { LoginPage } from './pages';
import { RegisterPage } from './pages';
import { RoomPage } from './pages';
import { MyBookingsPage } from './pages';
import { AdminPage } from './pages';

export const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='room/:id' element={<RoomPage />} />
					<Route
						path='my'
						element={
							<ProtectedRoute>
								<MyBookingsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='admin'
						element={
							<AdminRoute>
								<AdminPage />
							</AdminRoute>
						}
					/>
				</Route>
			</Routes>
			<ErrorNotification />
		</>
	);
};
