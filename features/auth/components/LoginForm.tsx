import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { theme } from '../../../constants/theme';

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  serverError?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  serverError = null,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Validación básica de Email
    if (!email.trim()) {
      setEmailError('El correo electrónico es requerido');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError('Ingresa un correo electrónico válido');
        isValid = false;
      }
    }

    // Validación básica de Contraseña
    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit?.({ email: email.trim(), password });
    }
  };

  return (
    <View style={styles.formContainer}>
      {!!serverError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorBoxText}>{serverError}</Text>
        </View>
      )}

      <Input
        placeholder="Dirección de email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (emailError) setEmailError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={emailError}
      />

      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        secureTextEntry
        error={passwordError}
      />

      <Button
        title="Iniciar sesión"
        onPress={handleSubmit}
        isLoading={isLoading}
        style={styles.submitButton}
      />

      <Link href="/" asChild>
        <Text style={styles.credits}>Volver al inicio</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: 'center',
    maxWidth: 300,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: 15,
    paddingTop: 64,
    width: '100%',
  },
  errorBox: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.destructive,
    borderRadius: 0,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  errorBoxText: {
    color: theme.colors.destructive,
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: -theme.spacing.sm,
  },
  credits: {
    color: theme.colors.foreground,
    fontFamily: 'monospace',
    fontSize: 11,
    marginTop: 40,
    opacity: 0.6,
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});