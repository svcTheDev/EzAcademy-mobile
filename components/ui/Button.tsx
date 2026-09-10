import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { theme } from '../../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled,
  style,
  textStyle,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  const isBtnDisabled = disabled || isLoading;
  const [isPressed, setIsPressed] = useState(false);

  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      case 'primary':
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.baseContainer,
        getContainerStyle(),
        isPressed && styles.pressedContainer,
        isBtnDisabled && styles.disabledContainer,
        style,
      ]}
      disabled={isBtnDisabled}
      activeOpacity={0.8}
      onPressIn={(event) => {
        setIsPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setIsPressed(false);
        onPressOut?.(event);
      }}
      {...rest}
    >
      <View
        pointerEvents="none"
        style={styles.cubeFace}
      >
        <View style={styles.cubeInner} />
      </View>
      <View
        pointerEvents="none"
        style={styles.cubeTop}
      >
        <View style={styles.cubeTopInner} />
      </View>
      <View pointerEvents="none" style={styles.cubeRight}>
        <View style={styles.cubeRightInner} />
      </View>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.primaryForeground} size="small" style={styles.content} />
      ) : (
        <Text style={[styles.baseText, getTextStyle(), textStyle, styles.content]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'visible',
  },
  primaryContainer: {
    backgroundColor: 'transparent',
  },
  secondaryContainer: {
    backgroundColor: 'transparent',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  pressedContainer: {
    opacity: 0.85,
  },
  cubeFace: {
    backgroundColor: '#341979',
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
    backgroundColor: '#020024',
    height: 8,
    left: 5,
    position: 'absolute',
    right: -5,
    top: -8,
    transform: [{ skewX: '-45deg' }],
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
    backgroundColor: theme.colors.cubeRight,
    bottom: 5,
    position: 'absolute',
    right: -8,
    top: -5,
    transform: [{ skewY: '-45deg' }],
    width: 8,
  },
  cubeRightInner: {
    backgroundColor: theme.colors.cubeFace,
    bottom: 2,
    left: 0,
    position: 'absolute',
    right: 2,
    top: 2,
  },
  content: {
    zIndex: 1,
  },
  baseText: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  primaryText: {
    color: theme.colors.primaryForeground,
  },
  secondaryText: {
    color: theme.colors.secondaryForeground,
  },
  outlineText: {
    color: theme.colors.foreground,
  },
});