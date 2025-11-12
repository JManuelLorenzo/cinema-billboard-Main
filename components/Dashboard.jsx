import { Dimensions, StyleSheet, View, Text } from "react-native";
import Movie from "../components/Movie";
import AddMovieFloatingButton from "../components/AddMovieFloatingButton";
import SegmentControl from "../components/SegmentControl";
import AddMovieModal from "../components/AddMovieModal";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../hooks/useFetch";
import { FlatList } from "react-native";
import useCategoriesWithMovies from "../hooks/useCategoriesWithMovies";
import usePost from "../hooks/usePost";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const BASE_URL = "https://nondigestive-shea-divertedly.ngrok-free.dev";

  const { data, loading, error } = useFetch(`${BASE_URL}/movies`, refresh);
  const { data: dataCategories } = useFetch(`${BASE_URL}/categories`, refresh);
  const { data: dataDivided } = useCategoriesWithMovies(
    BASE_URL,
    dataCategories
  );
  const { postData } = usePost(`${BASE_URL}/movies`);
  const [modalVisible, setModalVisible] = useState(false);
  const [segment, setSegment] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentControl
        segments={["All Movies", "Movies By Category"]}
        selectedSegment={segment}
        onSegmentSelect={(index) => {
          setSegment(index);
        }}
        style={{ width: Dimensions.get("window").width - 20 }}
      />
      {segment === 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Movie
              title={item.title}
              poster={item.poster}
              description={item.description}
              duration={item.duration}
              rating={item.rating}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      ) : (
        <FlatList
          data={dataDivided}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 20, padding: 40 }}>
                {item.category.name}
              </Text>
              <FlatList
                horizontal
                data={item.movies}
                renderItem={({ item: movie }) => (
                  <Movie
                    title={movie.title}
                    poster={movie.poster}
                    description={movie.description}
                    duration={movie.duration}
                    rating={movie.rating}
                  />
                )}
                keyExtractor={(item) => String(item.id)}
              ></FlatList>
            </View>
          )}
          keyExtractor={(item) => item.category.id}
        />
      )}
      <AddMovieFloatingButton
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          console.log("Add Movie Pressed");
          setModalVisible(true);
        }}
      />
      <AddMovieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(newMovie) => {
          postData(newMovie);
          console.log("Movie submitted");
          setRefresh(!refresh);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
