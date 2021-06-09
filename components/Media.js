import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import BasicButton from "./BasicButton";

export default function Media() {
    const [image, setImage] = useState(null);
    const [uploadUrl, setUploadUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [percentUploaded, setPercentUploaded] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quizType, setQuizType] = useState("");

    //component did mount
    useEffect(() => {
        //asking for permission to access phone's gallery
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    //function to handle when Pick Image btn is clicked on
    async function handlePickImgBtnClick() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    //component rendering
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Media Management</Text>
            <View style={styles.divider}></View>

            <Text style={styles.label}>Quiz Name</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Enter your name"
                value={quizName}
                onChangeText={(name) => setQuizName(name)}
            />
            <View style={styles.divider}></View>

            <Text style={styles.label}>Quiz Type</Text>
            <Picker
                style={styles.inputField}
                selectedValue={quizType}
                onValueChange={(quizType, itemIndex) => setQuizType(quizType)}
            >
                <Picker.Item label="" value="" />
                <Picker.Item label="Maths Quiz" value="Maths Quiz" />
                <Picker.Item label="Science Quiz" value="Science Quiz" />
                <Picker.Item label="Sports Quiz" value="Sports Quiz" />
                <Picker.Item label="English  Quiz" value="English Quiz" />
                <Picker.Item label="Hindi Quiz" value="Hindi Quiz" />
                <Picker.Item label="Technology Quiz" value="Technology Quiz" />
                <Picker.Item label="Arts Quiz" value="Arts Quiz" />
            </Picker>
            <View style={styles.divider}></View>

            <BasicButton
                text="Pick Image"
                onPress={handlePickImgBtnClick}
            />
            <View style={styles.divider}></View>

            {
                isUploading ?
                    <>
                        <ActivityIndicator />
                        <Text style={styles.percent}>{percentUploaded}</Text>
                        <View style={styles.divider}></View>
                    </>
                    : null
            }

            {
                image ?
                    <>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.divider}></View>
                    </>

                    : null
            }

            <BasicButton
                text="Submit Quiz"
                onPress={handleSubmitQuizBtnClick}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 30,
    },

    title: {
        fontWeight: '500',
        fontSize: 30,
        letterSpacing: 0.1,
        textAlign: "center",
    },

    label: {
        fontSize: 16,
        lineHeight: 18,
        color: '#666666',
        marginBottom: 3,
    },

    inputField: {
        fontSize: 14,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingVertical: 6,
    },

    divider: {
        paddingVertical: 8,
    },

    image: {
        alignSelf: "center",
        width: "100%",
        height: 200,
    },

    percent: {
        textAlign: "center",
    }
});
