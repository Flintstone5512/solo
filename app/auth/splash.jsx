import React, { useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import ThemeContext from "../../theme/ThemeContext";
import { useRouter } from "expo-router";

const Splash = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const continueToNext = () => {
    router.push("/auth/SplashOne");
  };

  return (
    <View style={styles.container}>
      {/* Ninja Elephant Image */}
      <Image
        source={require("../../assets/images/first.png")}
        style={styles.image}
      />

      {/* Next Button */}
      <TouchableOpacity onPress={continueToNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // pure white background
  },
  image: {
    width: "70%", // keep proportionate
    height: 300,
    resizeMode: "contain",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#6A1B9A", // Purple accent (can match your theme)
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
