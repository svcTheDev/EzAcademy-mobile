// app/(authenticated)/_layout.tsx
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../features/auth/context/AuthContext';
import { theme } from '../../constants/theme';

export default function AuthenticatedLayout() {
  const { status } = useAuth();

  // 1. Mientras se lee el SecureStore o se verifica la sesión inicial
  if (status === 'loading' || status === 'idle') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  // 2. Si NO está autenticado, redirige automáticamente a /login
  if (status === 'unauthenticated' || status === 'error') {
    return <Redirect href="/login" />;
  }

  // 3. Si SÍ está autenticado, renderiza las pantallas hijas
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.foreground,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="home" options={{ title: 'Inicio' }} />
      <Stack.Screen name="courses" options={{ title: 'Cursos' }} />
      <Stack.Screen name="sessions" options={{ title: 'Sesiones' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
