import React from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useIoT } from '../../context/IoTContext';
import { colors, spacing } from '../../theme';

export default function DashboardScreen() {
  const { devices, sensors, toggleDevice, gatewayConnected, refreshSensors, isRefreshingSensors } = useIoT();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.title}>Your home at a glance</Text>
        </View>
        <Pressable onPress={() => void refreshSensors()} disabled={isRefreshingSensors} style={styles.refresh}>
          <Ionicons name="refresh-outline" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.connection}>
        <View style={[styles.connectionDot, { backgroundColor: gatewayConnected ? colors.success : colors.danger }]} />
        <Text style={styles.connectionText}>
          {gatewayConnected ? 'Gateway connected' : 'Gateway disconnected'}
        </Text>
      </View>

      <View style={styles.sensorRow}>
        <SensorCard icon="thermometer-outline" label="Temperature" value={`${sensors.temperature}°C`} />
        <SensorCard icon="water-outline" label="Humidity" value={`${sensors.humidity}%`} />
      </View>
      <SensorCard icon="sunny-outline" label="Light" value={`${sensors.lightLevel} lux`} fullWidth />

      <Text style={styles.sectionTitle}>Device status</Text>
      {devices.map((device) => (
        <View key={device.id} style={styles.deviceCard}>
          <View style={styles.deviceInfo}>
            <Ionicons name={device.icon} size={26} color={colors.primary} style={styles.deviceIcon} />
            <View>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceType}>{device.type}</Text>
            </View>
          </View>
          <Switch value={device.status} disabled={!gatewayConnected} onValueChange={(value) => void toggleDevice(device.id, value)} />
        </View>
      ))}
    </ScrollView>
  );
}

function SensorCard({ icon, label, value, fullWidth = false }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <View style={[styles.sensorCard, fullWidth && styles.fullCard]}>
      <View style={styles.sensorHeader}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.sensorLabel}>{label}</Text>
      </View>
      <Text style={styles.sensorValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 32 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 14, color: colors.muted },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginTop: 6, marginBottom: 18 },
  refresh: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primarySoft, justifyContent: 'center', alignItems: 'center' },
  connection: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  connectionDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  connectionText: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  sensorRow: { flexDirection: 'row', marginBottom: 12 },
  sensorCard: { flex: 1, backgroundColor: colors.surface, borderRadius: spacing.radius, padding: 16, marginRight: 12, borderWidth: 1, borderColor: colors.border },
  fullCard: { marginRight: 0, marginBottom: 12 },
  sensorHeader: { flexDirection: 'row', alignItems: 'center' },
  sensorLabel: { fontSize: 14, marginLeft: 8, color: colors.muted },
  sensorValue: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginTop: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginTop: 10, marginBottom: 10 },
  deviceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: spacing.radius, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  deviceInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  deviceIcon: { marginRight: 12 },
  deviceName: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  deviceType: { fontSize: 12, color: colors.muted, marginTop: 4 },
});
