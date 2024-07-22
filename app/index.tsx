import { Text, StyleSheet, View, Button, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useState } from "react";

export default function HomeScreen() {
  const [permissions, setPermissions] = useState<null | string>(null);
  const [lastKnownLocation, setLastKnownLocation] = useState<null | string>(
    null
  );
  const [currentLocation, setCurrentLocation] = useState<null | string>(null);
  const [locations, setLocations] = useState<null | string>("\n");
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.title}>
            Click button below to request location permissions and show their
            status.
          </Text>
          <Text style={styles.content}>
            Current permissions:
            {permissions ?? "\nUnknown"}
          </Text>
          <Button
            title="Request permission"
            onPress={async () => {
              console.log("Requesting location permission...");
              const response = await requestForegroundPermissionsAsync();
              console.log("Response:", response);
              setPermissions(
                `\nStatus: ${response.status}; Accuracy: ${response.android?.accuracy}`
              );
            }}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Click button below to get the last known location.
          </Text>
          <Text style={styles.content}>
            Last known location:
            {lastKnownLocation ?? "\nUnknown"}
          </Text>
          <Button
            title="Get last location"
            onPress={async () => {
              console.log("Getting last known location...");
              const response = await getLastKnownPositionAsync();
              console.log("Response:", response);
              setLastKnownLocation(
                `\nLatitude: ${response?.coords.latitude}; Longitude: ${response?.coords.longitude}`
              );
            }}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Click button below to refresh and get the current location.
          </Text>
          <Text style={styles.content}>
            Current location:
            {currentLocation ?? "\nUnknown"}
          </Text>
          <Button
            title="Get current location"
            onPress={async () => {
              console.log("Getting current location...");
              const response = await getCurrentPositionAsync();
              console.log("Response:", response);
              setCurrentLocation(
                `\nLatitude: ${response.coords.latitude}; Longitude: ${response.coords.longitude}`
              );
            }}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Click button below to start watching location changes.
          </Text>
          <Text style={styles.content}>Locations: {locations}</Text>
          <Button
            title="Start watching location"
            onPress={async () => {
              console.log("Starting to watch location...");
              const response = await watchPositionAsync({}, (location) => {
                console.log("Location:", location);
                setLocations(
                  (prev) =>
                    `\nLatitude: ${location.coords.latitude}; Longitude: ${location.coords.longitude}` +
                    prev
                );
              });
              console.log("Response:", response);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    color: "grey",
    fontWeight: "normal",
    fontSize: 16,
    marginBottom: 16,
  },
});
