import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchVidoes } from '../services/youtube';
import * as WebBrowser from 'expo-web-browser';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.7; // 70% of screen width
const CARD_MARGIN = 10;

const WatchList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {

            const getVideo = async () => {
                const videoData = await fetchVidoes();
                setVideos(videoData);
            };
            getVideo();
    }, []);

    const handlePress = (videoId) => {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        WebBrowser.openBrowserAsync(videoUrl);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePress(item.id.videoId)}
            style={styles.videoCard}
        >
            <Image
                source={{ uri: item.snippet.thumbnails.medium.url }}
                style={styles.thumbnail}
                resizeMode="cover"
            />
            <Text style={styles.videoTitle} numberOfLines={2}>
                {item.snippet.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {videos.length > 0 ? (
                <FlatList
                    data={videos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.videoId}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.videoList}
                />
            ) : (
                <Text style={styles.loadingText}>Loading videos...</Text>
            )}
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    videoList: {
        paddingLeft: CARD_MARGIN,
        paddingVertical: 10,
    },
    videoCard: {
        width: CARD_WIDTH,
        marginRight: CARD_MARGIN,
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
        padding: 10,
    },
    thumbnail: {
        width: '100%',
        height: 160,
        borderRadius: 10,
    },
    videoTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        color: '#333',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 20,
        color: '#777',
    },
});

export default WatchList;

