import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    },[]);

    async function handleAddProject(){
        const response = await api.post('projects',{
            title: `Novo projeto ${Date.now()}`,
            owner: 'Reginaldo Aguiar'
        });        

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

        <SafeAreaView style={styles.container}>
            <FlatList
                
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project}>{project.title}</Text>
                )}
            />
            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button} 
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>ADD Project</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#7159C1',
    },
    project :{
        color: '#FFF',
        fontSize: 20,
    },
    button :{
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius:4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 16,
    },
});