import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type { Listing } from '../types/controllerTypes';
import { DarkTheme, LightTheme } from '../constants/Colors';
import { ExplorerUtil } from '../utils/ExplorerUtil';
import { ConfigCtrl } from '../controllers/ConfigCtrl';

interface Props {
  currentWCURI?: string;
  walletInfo: Listing;
  style?: StyleProp<ViewStyle>;
}

export const ITEM_HEIGHT = 80;

function WalletItem({ currentWCURI, walletInfo, style }: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = () => {
    if (currentWCURI) {
      ConfigCtrl.setRecentWalletDeepLink(
        walletInfo.mobile?.native || walletInfo.mobile?.universal
      );
      ExplorerUtil.navigateDeepLink(
        walletInfo.mobile.universal,
        walletInfo.mobile.native,
        currentWCURI
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      key={walletInfo.id}
      style={[styles.container, style]}
    >
      <Image
        style={styles.icon}
        source={{ uri: ExplorerUtil.getWalletImageUrl(walletInfo.image_id) }}
      />
      <Text
        style={[styles.name, isDarkMode && styles.nameDark]}
        numberOfLines={1}
      >
        {walletInfo.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    marginVertical: 16,
  },
  icon: {
    height: 60,
    width: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: LightTheme.overlayThin,
  },
  name: {
    color: LightTheme.foreground1,
    marginTop: 5,
    maxWidth: 100,
    fontSize: 12,
    fontWeight: '600',
  },
  nameDark: {
    color: DarkTheme.foreground1,
  },
});

export default WalletItem;
