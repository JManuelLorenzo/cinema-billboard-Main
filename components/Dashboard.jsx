import { Dimensions, StyleSheet, View, Text } from "react-native";
import Movie from "../components/Movie";
import AddMovieFloatingButton from "../components/AddMovieFloatingButton";
import SegmentControl from "../components/SegmentControl";
import AddMovieModal from "../components/AddMovieModal";
import { use, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../hooks/useFetch";
import { FlatList } from "react-native";

export default function Dashboard() {
  const { data, loading, error } = useFetch(
    "https://nondigestive-shea-divertedly.ngrok-free.dev/movies"
  );

  const firstMovie = data?.[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [segment, setSegment] = useState(0);
  if (!firstMovie) return <></>;
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
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Working to!!!</Text>
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
        onSubmit={() => {
          // Handle form submission
          console.log("Movie submitted");
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
