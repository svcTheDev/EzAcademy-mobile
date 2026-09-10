import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../features/auth/components/LoginForm';
import { theme } from '../constants/theme';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Handler temporal de prueba (Simulación)
  const handleLoginSubmit = (data: { email: string; password: string }) => {
    setIsLoading(true);
    setServerError(null);

    // Simulación de respuesta de red (2 segundos)
    setTimeout(() => {
      setIsLoading(false);

      // Prueba visual temporal
      Alert.alert(
        'Datos capturados correctamente',
        `Email: ${data.email}\nPassword: ${data.password.replace(/./g, '*')}`
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header con marca EzAcademy */}
          <View style={styles.headerContainer}>
            <Text style={styles.brandTitle}>EzAcademy</Text>
            <Text style={styles.brandBadge}>MOBILE V1</Text>
          </View>

          {/* Formulario de Login */}
          <LoginForm
            onSubmit={handleLoginSubmit}
            isLoading={isLoading}
            serverError={serverError}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.foreground,
    letterSpacing: 0.5,
  },
  brandBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.accent,
    letterSpacing: 2,
    marginTop: theme.spacing.xs,
  },
});