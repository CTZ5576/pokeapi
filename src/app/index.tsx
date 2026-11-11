import { useAudioPlayer } from "expo-audio";
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [pokemon, setPokemon] = useState<any[]>([]);

  const player = useAudioPlayer(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
  }, []);

  const playAudio = (Audio: string) => {
    player.replace(Audio);
    player.play();
  };

const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={{ paddingTop: 50, flex: 1 }}>
      <View>
      <Button 
        title="Ir a camara" 
        onPress={() => router.push('/camara')} 
      />
      
    </View>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          const id = index + 1;
          const Audio = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                }}
                style={{ width: 96, height: 96 }}
              />
              <Text style={{ padding: 10 }}>{item.name}</Text>
              <Button title="Audio" onPress={() => playAudio(Audio)} />


            <TouchableOpacity style={styles2.button} onPress={triggerHaptic}>
              <Text style={styles2.buttonText}>Vibrar</Text>
            </TouchableOpacity>

            </View>
          );
        }}
      />
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#00f',
    fontSize: 16,
    fontWeight: '600',
  },
});