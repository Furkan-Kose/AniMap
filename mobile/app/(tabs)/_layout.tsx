import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const TabsLayout = () => {
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
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="animals"
          options={{
            title: "Animals",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="paw" size={size} color={color} />
            ),
            tabBarLabel: "Animals",
          }}
        />

        <Tabs.Screen
          name="add-animal"
          options={{
            headerTitle: "Add Animal",
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 28,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 8,
                  borderWidth: 2,
                  borderColor: color,
                }}
              >
                <FontAwesome name="plus" size={size} color={color} />
              </View>
            ),
          }}
        />


        <Tabs.Screen
          name="campaigns"
          options={{
            title: "Campaigns",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bullhorn" size={size} color={color} />
            ),
            tabBarLabel: "Campaigns",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
