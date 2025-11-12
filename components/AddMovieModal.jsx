import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import CategoriesDropDown from "./CategoriesDropDown";
import useFetch from "../hooks/useFetch";

export default function AddMovieModal({ visible, onClose, onSubmit }) {
  const { data: categories } = useFetch(
    "https://nondigestive-shea-divertedly.ngrok-free.dev/categories"
  );

  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const resetForm = () => {
    setTitle("");
    setPoster("");
    setDescription("");
    setDuration("");
    setRating("");
    setSelectedCategory(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Movie</Text>
          {/* Form elements would go here */}
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Poster URL"
            style={styles.input}
            value={poster}
            onChangeText={setPoster}
          />
          <TextInput
            placeholder="description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          ></TextInput>
          <TextInput
            placeholder="duration"
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
          ></TextInput>
          <TextInput
            placeholder="rating"
            style={styles.input}
            value={rating}
            onChangeText={setRating}
          ></TextInput>

          <CategoriesDropDown
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Submit"
              onPress={() => {
                // Validar título
                if (!title.trim()) {
                  Alert.alert("Error", "El título es obligatorio");
                  return;
                }

                // Validar poster URL
                if (!poster.trim()) {
                  Alert.alert("Error", "La URL del póster es obligatoria");
                  return;
                }

                // Validar descripción
                if (!description.trim()) {
                  Alert.alert("Error", "La descripción es obligatoria");
                  return;
                }

                // Validar duración
                if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
                  Alert.alert(
                    "Error",
                    "La duración debe ser un número mayor a 0"
                  );
                  return;
                }

                // Validar rating
                if (!rating || isNaN(rating)) {
                  Alert.alert("Error", "El rating debe ser un número");
                  return;
                }
                const ratingNum = parseFloat(rating);
                if (ratingNum < 0 || ratingNum > 10) {
                  Alert.alert("Error", "El rating debe estar entre 0 y 10");
                  return;
                }

                // Validar categoría
                if (!selectedCategory) {
                  Alert.alert("Error", "Debes seleccionar una categoría");
                  return;
                }

                // Construir objeto película
                const newMovie = {
                  title: title.trim(),
                  poster: poster.trim(),
                  description: description.trim(),
                  duration: parseInt(duration),
                  rating: parseFloat(rating),
                  category: selectedCategory,
                };

                // Enviar datos
                if (onSubmit) onSubmit(newMovie);

                // Limpiar formulario y cerrar
                resetForm();
                onClose();
              }}
            />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
