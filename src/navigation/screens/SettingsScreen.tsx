import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useIoT } from '../../context/IoTContext';
import { colors, spacing } from '../../theme';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { gatewayConnected, setGatewayConnected } = useIoT();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your IoT application</Text>

      <Text style={styles.sectionTitle}>General</Text>

      <View style={styles.settingCard}>
        <View style={styles.settingInfo}>
          <Ionicons name="notifications-outline" size={26} />
          <View style={styles.settingText}>
            <Text style={styles.settingName}>Notifications</Text>
            <Text style={styles.settingDescription}>Receive alerts from your IoT devices</Text>
          </View>
        </View>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.settingCard}>
        <View style={styles.settingInfo}>
          <Ionicons name="wifi-outline" size={26} />
          <View style={styles.settingText}>
            <Text style={styles.settingName}>Auto Connect</Text>
            <Text style={styles.settingDescription}>Automatically connect to the IoT gateway</Text>
          </View>
        </View>
        <Switch value={autoConnect} onValueChange={setAutoConnect} />
      </View>

      <View style={styles.settingCard}>
        <View style={styles.settingInfo}>
          <Ionicons name="moon-outline" size={26} />
          <View style={styles.settingText}>
            <Text style={styles.settingName}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use a darker application appearance</Text>
          </View>
        </View>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <Text style={styles.sectionTitle}>Connection</Text>

      <View style={styles.connectionCard}>
        <View style={styles.connectionInfo}>
          <Ionicons
            name={gatewayConnected ? 'cloud-done-outline' : 'cloud-offline-outline'}
            size={30}
          />
          <View style={styles.connectionText}>
            <Text style={styles.connectionTitle}>IoT Gateway</Text>
            <Text style={styles.connectionStatus}>
              {gatewayConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        <Switch
          value={gatewayConnected}
          onValueChange={(value) => setGatewayConnected(value)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 24,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  connectionText: {
    marginLeft: 15,
  },
  connectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectionStatus: {
    fontSize: 13,
    marginTop: 4,
    color: colors.muted,
  },
});