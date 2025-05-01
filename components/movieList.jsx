import { StyleSheet, Text, View , Image, TouchableOpacity, FlatList ,Dimensions} from 'react-native'
import React,{useState, useEffect} from 'react'
import { fetchMovies } from '../services/tmdb'


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_MARGIN = 10;

const MovieList = ({mood}) => {
    const [movies, setMovies] = useState([]);

    useEffect( ()=>{
        if(mood){
            const getMovies = async ()=>{
                const movieData = await fetchMovies(mood);
                setMovies(movieData);
            };
            getMovies();
        }
    }, [mood])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
            style={styles.movieCard}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text>Rating: {item.vote_average}</Text>
            </TouchableOpacity>
        );
    };
    
  return (
    <View style={styles.container}>
        {
            movies.length > 0 ? (
                <FlatList 
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.movieList}
                />
            ):(
                <Text style={styles.loadingText}> loading movies....(please select a mood) </Text>
            )
        }
  </View>


  )
}

export default MovieList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    movieList: {
        paddingLeft: CARD_MARGIN,
        paddingVertical: 10,
    },
    movieCard: {
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
        height: 180,
        borderRadius: 10,
    },
    movieTitle: {
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


