import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  imageBack: string;
  types: PokemonTypes[];
}

interface PokemonTypes {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: { [key: string]: string } = {
  fire: "rgba(239, 68, 68, 0.50)",
  water: "rgba(59, 130, 246, 0.50)",
  grass: "rgba(34, 197, 94, 0.50)",
  electric: "rgba(234, 179, 8, 0.50)",
  ice: "rgba(34, 211, 238, 0.50)",
  fighting: "rgba(153, 27, 27, 0.50)",
  poison: "rgba(168, 85, 247, 0.50)",
  ground: "rgba(180, 83, 9, 0.50)",
  flying: "rgba(79, 70, 229, 0.50)",
  psychic: "rgba(236, 72, 153, 0.50)",
  bug: "rgba(101, 163, 13, 0.50)",
  rock: "rgba(107, 114, 128, 0.50)",
  ghost: "rgba(88, 28, 135, 0.50)",
  dragon: "rgba(55, 48, 163, 0.50)",
  dark: "rgba(23, 23, 23, 0.50)",
  steel: "rgba(75, 85, 99, 0.50)",
};

export default function Index() {
  const [pokemons, SetPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );
      SetPokemons(pokemonDetails);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }
  return (
    <ScrollView style={styles.container}>
      {pokemons.map((pokemon) => (
      <Link key={pokemon.name} href={"/detalis"}
          style={{
            backgroundColor: colorsByType[pokemon.types[0].type.name],
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          }}>
        <View
       
        >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.nameType}>{pokemon.types[0].type.name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
        </Link>
      ))}
      <Text>Pockedex</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nameType: {
    fontSize: 16,
    color: "gray",
  },
});
