import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { theme } from "../../../constants/theme";
import { useRouter } from "expo-router";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const validate = (): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    // Validación básica de Email
    if (!email.trim()) {
      setEmailError("El correo electrónico es requerido");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError("Ingresa un correo electrónico válido");
        isValid = false;
      }
    }

    // Validación básica de Contraseña
    if (!password) {
      setPasswordError("La contraseña es requerida");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      router.push("/home");
      onSubmit?.({ email: email.trim(), password });
    }
  };
  

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Ingresa a tu cuenta de EzAcademy</Text>

      {/* Mensaje de error general del servidor V1 */}
      {!!serverError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorBoxText}>{serverError}</Text>
        </View>
      )}

      <Input
        label="Correo electrónico"
        placeholder="ejemplo@correo.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (emailError) setEmailError("");
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={emailError}
      />

      <Input
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (passwordError) setPasswordError("");
        }}
        secureTextEntry
        error={passwordError}
      />

      <Button
        title="Ingresar"
        onPress={handleSubmit}
        isLoading={isLoading}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.lg,
  },
  errorBox: {
    backgroundColor: `${theme.colors.destructive}20`,
    borderWidth: 1,
    borderColor: theme.colors.destructive,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  errorBoxText: {
    color: theme.colors.destructive,
    fontSize: 14,
    textAlign: "center",
  },
  submitButton: {
    marginTop: theme.spacing.sm,
  },
});
