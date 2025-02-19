import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper"; // Importamos el Checkbox de react-native-paper

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleSelection = (name) => {
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (loading) return <ActivityIndicator size="large" color="blue" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona Pokémon</Text>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Checkbox
              status={selected[item.name] ? "checked" : "unchecked"}
              onPress={() => toggleSelection(item.name)}
            />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});
