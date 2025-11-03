// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'house': 'home-outline',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'magnifyingglass': 'search',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'person.fill': 'account-circle',
  'person': 'account-circle-outline',
  'shopping-cart': 'shopping-cart',
  'shopping-bag': 'shopping-bag',
  'airplane': 'flight',
  'phone': 'phone',
  'envelope': 'email',
  'map': 'location-on',
  'credit-card': 'credit-card',
  'settings': 'settings',
  'help': 'help-outline',
  'info': 'info',
  'logout': 'logout',
  'star': 'star',
  'star.fill': 'star',
  'chevron.left': 'chevron-left',
  'arrow.right': 'arrow-forward',
  'plus': 'add',
  'minus': 'remove',
  'checkmark': 'check',
  'xmark': 'close',
  'trash': 'delete',
  'pencil': 'edit',
  'camera': 'camera-alt',
  'photo': 'photo',
  'music': 'music-note',
  'video': 'video-library',
  'gamecontroller': 'sports-esports',
  'headphones': 'headphones',
  'speaker.wave': 'speaker',
  'laptop': 'laptop',
  'desktop': 'desktop-mac',
  'tablet': 'tablet',
  'watch': 'watch',
  'keyboard': 'keyboard',
  'mouse': 'mouse',
  'printer': 'print',
  'arrow-left': 'arrow-back',
  'checkmark-circle': 'check-circle',
} as IconMapping;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
