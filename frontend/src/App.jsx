import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

export const App = () => {
	return (
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
	);
};
