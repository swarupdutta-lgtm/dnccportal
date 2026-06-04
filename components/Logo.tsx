import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes } from '../theme/colors';

export function Logo({ size = 'large' }: { size?: 'large' | 'small' }) {
  const imgSize = size === 'small' ? 40 : 80;

  return (
    <View style={[styles.container, size === 'small' && styles.containerSmall]}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: imgSize, height: imgSize }}
        resizeMode="contain"
      />
      {size === 'large' && (
        <Text style={styles.title}>Citizen's Portal</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  containerSmall: {
    marginBottom: 0,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.white,
    marginTop: Spacing.sm,
  },
});
