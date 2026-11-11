import { useEffect, useState } from "react";
import { Button, FlatList, Image, Text, View } from "react-native";




export default function berris() {
    const [Berry, setBerry] = useState<any[]>([]);

    useEffect(() => {
    fetch("https://pokeapi.co/api/v2/berry?limit=10&offset=0")
      .then((res) => res.json())
      .then((data) => setBerry(data.results));
  }, []);
  return (
      <View style={{ paddingTop: 50, flex: 1 }}>
        
        <FlatList
          data={Berry}
          
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
          const id = index + 1;
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: `hhttps://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${id}.png`,
                  }}
                  style={{ width: 96, height: 96 }}
                />
                <Text style={{ padding: 10 }}>{item.name}</Text>
                <Button title="Audio" />
              </View>
            );
          }}
        />
      </View>
    );
  }
  
  