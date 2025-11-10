import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SegmentControl from "./SegmentControl";
import { formatDuration, getRatingStars } from "../utils/formatters";

const Movie = ({ title, poster, description, duration, rating }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: poster }} style={styles.poster} />
      <Text style={styles.description}>Description: {description}</Text>
      <Text style={styles.description}>Rating: {getRatingStars(rating)}</Text>
      <Text style={styles.description}>
        Duration: {formatDuration(duration)}
      </Text>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  poster: {
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
