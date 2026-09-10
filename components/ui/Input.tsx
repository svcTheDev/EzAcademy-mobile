import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { theme } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.cubeContainer}>
        <View
          pointerEvents="none"
          style={[
            styles.cubeFace,
            { backgroundColor: getEdgeColor(isFocused, !!error) },
          ]}
        >
          <View style={styles.cubeInner} />
        </View>
        <View
          pointerEvents="none"
          style={[
            styles.cubeTop,
            { backgroundColor: getEdgeColor(isFocused, !!error) },
          ]}
        >
          <View style={styles.cubeTopInner} />
        </View>
        <View
          pointerEvents="none"
          style={[
            styles.cubeRight,
            { backgroundColor: getEdgeColor(isFocused, !!error) },
          ]}
        >
          <View style={styles.cubeRightInner} />
        </View>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.mutedForeground}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const getEdgeColor = (isFocused: boolean, hasError: boolean) => {
  if (hasError) return theme.colors.destructive;
  return isFocused ? theme.colors.cubeFocus : theme.colors.cubeInputEdge;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  label: {
    color: theme.colors.foreground,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  cubeContainer: {
    minHeight: 52,
    position: 'relative',
  },
  input: {
    backgroundColor: 'transparent',
    color: theme.colors.foreground,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 52,
    zIndex: 1,
  },
  cubeFace: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cubeInner: {
    backgroundColor: theme.colors.cubeFace,
    bottom: 2,
    left: 2,
    position: 'absolute',
    right: 2,
    top: 2,
  },
  cubeTop: {
    height: 8,
    left: 5,
    position: 'absolute',
    right: -5,
    top: -8,
    transform: [{ skewX: '-45deg' }],
    zIndex: 0,
  },
  cubeTopInner: {
    backgroundColor: theme.colors.cubeFace,
    bottom: 2,
    left: 2,
    position: 'absolute',
    right: 2,
    top: 2,
  },
  cubeRight: {
    bottom: 5,
    position: 'absolute',
    right: -8,
    top: -5,
    transform: [{ skewY: '-45deg' }],
    width: 8,
    zIndex: 0,
  },
  cubeRightInner: {
    backgroundColor: theme.colors.cubeFace,
    bottom: 2,
    left: 0,
    position: 'absolute',
    right: 2,
    top: 2,
  },
  errorText: {
    color: theme.colors.destructive,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },
});