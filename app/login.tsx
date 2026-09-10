import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LoginForm } from '../features/auth/components/LoginForm';
import { theme } from '../constants/theme';
import { useAuth } from '../features/auth/context/AuthContext';

export default function LoginScreen() {
  const { login, status, error } = useAuth();

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
            onSubmit={login}
            isLoading={status === 'loading'}
            serverError={error}
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