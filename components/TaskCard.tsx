import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: 'Work' | 'Personal' | 'Hobby';
}

interface TaskCardProps {
    task: Task;
    onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Work': return Colors.dark.primary;
            case 'Personal': return Colors.dark.secondary;
            case 'Hobby': return Colors.dark.accent;
            default: return Colors.dark.primary;
        }
    };

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed
            ]}
        >
            <View style={styles.cardContent}>
                <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(task.category) }]} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{task.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
                </View>
                {/* Subtle gradient overlay for depth */}
                <LinearGradient
                    colors={[getCategoryColor(task.category) + '15', 'transparent']}
                    style={StyleSheet.absoluteFillObject}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    pointerEvents="none"
                />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderRadius: 16,
        backgroundColor: Colors.dark.cardBackground,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    cardContent: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    categoryIndicator: {
        width: 4,
        height: 40,
        borderRadius: 2,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: Colors.dark.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: '#8E8E93',
        fontSize: 14,
    },
});
