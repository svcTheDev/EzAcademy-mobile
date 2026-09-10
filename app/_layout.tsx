import { Stack } from 'expo-router';
import { AuthProvider } from '../features/auth/context/AuthContext';

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen name="index" options={{ title: 'Inicio' }} />
				<Stack.Screen name="login" options={{ title: 'Iniciar sesión' }} />
			</Stack>
		</AuthProvider>
	);
}
