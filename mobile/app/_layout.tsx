import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(profile)/update-profile"
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#eab308',
              },
              headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold', 
                fontSize: 20,
              },
              headerTintColor: 'white',
              headerTitleAlign: 'left',
              headerTitle: 'Profil Güncelle',
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  )
}
