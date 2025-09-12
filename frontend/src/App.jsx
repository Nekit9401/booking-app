import { Routes, Route } from 'react-router-dom';
import { BookingsPage, HomePage, LoginPage, RegisterPage, RoomPage, AdminPage, NotFoundPage } from './pages';
import { AccesControl, MainLayout, Notifications } from './components';
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
							<AccesControl isAdminRoute={true}>
								<RoomForm />
							</AccesControl>
						}
					/>
					<Route
						path='room/create'
						element={
							<AccesControl isAdminRoute={true}>
								<RoomForm />
							</AccesControl>
						}
					/>
					<Route
						path='admin'
						element={
							<AccesControl isAdminRoute={true}>
								<AdminPage />
							</AccesControl>
						}
					/>

					<Route
						path='bookings'
						element={
							<AccesControl>
								<BookingsPage />
							</AccesControl>
						}
					/>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Notifications />
		</>
	);
};
