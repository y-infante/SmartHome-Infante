import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
        >

            {/* Header */}
            <View style={styles.header}>

                <View style={styles.logoContainer}>
                    <Ionicons
                        name="hardware-chip-outline"
                        size={40}
                        color={colors.primary}
                    />
                </View>

                <Text style={styles.title}>
                    IoT Home
                </Text>

                <Text style={styles.subtitle}>
                    Smart Environment
                </Text>

            </View>

            {/* Navigation Items */}
            <View style={styles.menu}>
                <DrawerItemList {...props} />
            </View>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        padding: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    logoContainer: {
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
        color: colors.muted,
    },

    menu: {
        marginTop: 10,
    },

});