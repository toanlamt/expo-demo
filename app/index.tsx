import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/Button';

// Mock Data
const INITIAL_TASKS = [
    { id: '1', title: 'Design System', description: 'Create a dark mode color palette.', completed: false, category: 'Work' as const },
    { id: '2', title: 'React Native components', description: 'Build reusable buttons and cards.', completed: true, category: 'Work' as const },
    { id: '3', title: 'Grocery Shopping', description: 'Buy milk, eggs, and bread.', completed: false, category: 'Personal' as const },
    { id: '4', title: 'Morning Jog', description: 'Run 5km in the park.', completed: false, category: 'Hobby' as const },
];

export default function HomeScreen() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const handleAddTask = () => {
        // In a real app, this would navigate to a form or open a modal
        const newTask = {
            id: Date.now().toString(),
            title: 'New Task',
            description: 'This is a new task added dynamically.',
            completed: false,
            category: 'Personal' as const
        };
        setTasks([newTask, ...tasks]);
    };

    return (
        <LinearGradient
            colors={['#000000', '#1A1A1A']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="light" />
                <View style={styles.header}>
                    <Text style={styles.greeting}>Good Evening,</Text>
                    <Text style={styles.title}>My Tasks</Text>
                </View>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskCard task={item} onPress={() => console.log('Task pressed:', item.title)} />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.footer}>
                    <Button title="+ Add New Task" onPress={handleAddTask} />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greeting: {
        color: '#8E8E93',
        fontSize: 16,
        marginBottom: 4,
    },
    title: {
        color: Colors.dark.text,
        fontSize: 34,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'transparent',
    },
});
