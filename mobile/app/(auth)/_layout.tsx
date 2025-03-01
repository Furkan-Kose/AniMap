import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const AuthLayout = () => {
  const router = useRouter();
  const { user, logoutFunc } = useAuth();

  return (
    <>
      <StatusBar style="light" backgroundColor="#eab308" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#eab308",
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          },
          headerTintColor: "white",
          headerTitleAlign: "left",
          headerLeft: () => (
            <View style={{ marginHorizontal: 15 }}>
              <TouchableOpacity onPress={() => router.push("/")}>
                <FontAwesome name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={user ? logoutFunc : () => router.push("/login")}
            >
              {user ? (
                <FontAwesome name="sign-out" size={24} color="white" />
              ) : (
                <FontAwesome name="user-circle" size={24} color="white" />
              )}
            </TouchableOpacity>
          ),
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            color: "#333",
            marginTop: 3,
          },
          tabBarIconStyle: {
            marginBottom: -5,
          },
          tabBarActiveTintColor: "#eab308",
        }}
      >
        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
            tabBarLabel: "Login",
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
            tabBarLabel: "Register",
          }}
        />
      </Tabs>
    </>
  );
};

export default AuthLayout;
