import {
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const AddAnimal = () => {

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        <Text className="text-2xl font-bold text-center mb-4">Hayvan Ekle</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAnimal;
