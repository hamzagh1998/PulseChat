import { useState } from "react";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";
import { Button, Icon, MD3Colors, Text } from "react-native-paper";

import { Spacer } from "@/components/spacer";

import { ItemProps } from "./onboarding-item";

export function PermissionsStep({ item }: { item: ItemProps }) {
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const reqPermissions = async () => {
    // contacts
    const { status: contactStatus } = await Contacts.requestPermissionsAsync();
    if (contactStatus !== "granted") {
      console.log("Permission to access contacts was denied");
    } else if (contactStatus === "granted") {
      console.log("Permission to access contacts was granted");
    }
    // locataion
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== "granted") {
      console.log("Permission to access location was denied");
    } else if (locationStatus === "granted") {
      console.log("Permission to access location was granted");
    }

    if (contactStatus === "granted" && locationStatus === "granted") {
      setIsAccessGranted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">{item.title}</Text>
      <Spacer marginTop={12} />
      <Text variant="bodyMedium">{item.text}</Text>
      <Spacer marginTop={32} />
      <View style={{ flex: 1 }}>
        <View
          style={{ ...styles.rowContainer, justifyContent: "space-between" }}
        >
          <View style={styles.rowContainer}>
            <Icon
              source="account-circle"
              color={MD3Colors.primary80}
              size={32}
            />
            <Text
              variant="headlineSmall"
              style={{ color: MD3Colors.primary80 }}
            >
              Contacts
            </Text>
          </View>
        </View>
        <Spacer marginTop={8} />
        <Text variant="bodyMedium">
          PulseChat will access your contacts to help you find people you know.
        </Text>
        <Spacer marginTop={26} />
        <View
          style={{ ...styles.rowContainer, justifyContent: "space-between" }}
        >
          <View style={styles.rowContainer}>
            <Icon source="google-maps" color={MD3Colors.primary80} size={32} />
            <Text
              variant="headlineSmall"
              style={{ color: MD3Colors.primary80 }}
            >
              Location
            </Text>
          </View>
        </View>
        <Spacer marginTop={6} />
        <Text variant="bodyMedium">
          PulseChat will access your location to help you find people nearby.
        </Text>
      </View>
      {!isAccessGranted ? (
        <Button
          mode="contained"
          onPress={reqPermissions}
          icon="account-lock-open"
          style={{ alignSelf: "flex-end", width: "auto" }}
        >
          Allow permissions
        </Button>
      ) : (
        <View style={{ ...styles.rowContainer, justifyContent: "flex-end" }}>
          <Icon source="check" color={MD3Colors.primary80} size={22} />
          <Text
            variant="bodyMedium"
            style={{ color: MD3Colors.primary80, alignSelf: "flex-end" }}
          >
            Permissions granted
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
});
