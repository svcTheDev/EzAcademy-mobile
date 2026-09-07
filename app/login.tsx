import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderColor: "#cccccc",
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 6,
    marginTop: 8,
    padding: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
