import { Routes, Route } from 'react-router-dom';
import { BookingsPage, HomePage, LoginPage, RegisterPage, RoomPage, AdminPage } from './pages';
import { MainLayout, Notifications } from './components';
import { ProtectedRoute } from './components';
import { AdminRoute } from './components';
import { RoomForm } from './pages/RoomPage/components';

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
						path='room/:id/edit'
						element={
							<AdminRoute>
								<RoomForm />
							</AdminRoute>
						}
					/>
					<Route
						path='room/create'
						element={
							<AdminRoute>
								<RoomForm />
							</AdminRoute>
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

					<Route
						path='bookings'
						element={
							<ProtectedRoute>
								<BookingsPage />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
			<Notifications />
		</>
	);
};
