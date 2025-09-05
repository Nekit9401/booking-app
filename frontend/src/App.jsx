import { Routes, Route } from 'react-router-dom';
import { BookingsPage, HomePage } from './pages';
import { ErrorNotification, MainLayout } from './components';
import { ProtectedRoute } from './components';
import { AdminRoute } from './components';
import { LoginPage } from './pages';
import { RegisterPage } from './pages';
import { RoomPage } from './pages';
import { AdminPage } from './pages';
import { CreateRoomPage } from './pages/RoomPage/components';

export const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='room/:id' element={<RoomPage />} />
					<Route path='admin/create-room' element={<CreateRoomPage />} />
					<Route
						path='bookings'
						element={
							<ProtectedRoute>
								<BookingsPage />
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
