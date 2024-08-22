import { useEffect, useState } from "react";
import * as Location from "expo-location";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import {
  PhoneNumberInput,
  getCountryByCode,
} from "react-native-paper-phone-number-input";

import { ItemProps } from "./onboarding-item";

import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/schemas/registration.schema";

import { Spacer } from "@/components/spacer";

export function PhoneNumStep({ item }: { item: ItemProps }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [countryCode, setCountryCode] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const { name, flag, dialCode } = getCountryByCode(countryCode); // Get country details

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  const getCountryCodeFromLocation = async (
    location: Location.LocationObject
  ) => {
    const [place] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (place?.isoCountryCode) {
      const code = place.isoCountryCode;
      setCountryCode(code);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      getCountryCodeFromLocation(location);
    }
  }, [location]);

  const onRegister = ({
    name,
    phoneNumber,
    verificationCode,
  }: RegistrationSchemaType) => {
    console.log(name, phoneNumber, verificationCode);
  };

  // Sign in with phone number
  const signInWithPhoneNumber = async () => {
    const phone = dialCode + phoneNumber;
    const confirmation = await auth().signInWithPhoneNumber(phone);

    console.log(phone, countryCode);

    if (confirmation) {
      setConfirm(confirmation);
    }
  };

  // Confirm the verification code
  const onConfirmCode = async () => {
    try {
      await confirm!.confirm(verificationCode);
      console.log("Phone number authenticated successfully");
    } catch (error) {
      console.error("Invalid code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">{item.title}</Text>
      <Spacer marginTop={12} />
      <Text variant="bodyMedium">{item.text}</Text>
      <Spacer marginTop={32} />
      <View style={{ flex: 1 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ""}
            />
          )}
          name="name"
        />
        <Spacer marginTop={12} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PhoneNumberInput
              onBlur={onBlur}
              code={countryCode}
              setCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={(value) => {
                setPhoneNumber(value as string);
                onChange(value);
              }}
            />
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber && <Text>{errors.phoneNumber.message}</Text>}
      </View>
      {confirm && (
        <>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Verification code"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={(value) => {
                  setVerificationCode(value);
                  onChange(value);
                }}
                value={value || ""}
              />
            )}
            name="verificationCode"
          />
          {errors.verificationCode && (
            <Text>{errors.verificationCode.message}</Text>
          )}

          <Button onPress={onConfirmCode}>Verify Code</Button>
        </>
      )}
      <Button onPress={signInWithPhoneNumber}>Register</Button>
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
