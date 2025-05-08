import { Text, ScrollView, TextInput, TouchableOpacity, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useCampaigns } from "@/hooks/useCampaigns";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddCampaign = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { addCampaign } = useCampaigns();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tags, setTags] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    const formattedEndDate = new Date(endDate.split("/").reverse().join("-")).toISOString();
  
    const data: any = {
      title,
      description,
      image,
      goalAmount: parseFloat(goalAmount),
      endDate: formattedEndDate,
      tags: tags.split(",").map((tag: string) => tag.trim()),
      organization: user?._id,
    };
  
    addCampaign.mutate(data, {
      onSuccess: () => {
        router.push("/campaigns");
        setTitle("");
        setDescription("");
        setImage("");
        setGoalAmount("");
        setEndDate("");
        setTags("");
      }
    });
  };  

  const handleDateChange = (event: any, date?: Date) => {
    if (event.type === "set" && date) {
      setSelectedDate(date);
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      setEndDate(formattedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        <Text className="text-2xl font-bold text-center mb-4">Kampanya Ekle</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Başlık"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Açıklama"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={image}
          onChangeText={setImage}
          placeholder="Resim URL"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={goalAmount}
          onChangeText={setGoalAmount}
          placeholder="Hedef Tutar"
          keyboardType="numeric"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View pointerEvents="none">
            <TextInput
              value={endDate}
              placeholder="Bitiş Tarihi (Gün/Ay/Yıl)"
              editable={false}
              className="border border-gray-400 p-4 rounded-md mt-4 text-sm text-gray-900"
            />
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        <TextInput
          value={tags}
          onChangeText={setTags}
          placeholder="Etiketler (virgülle ayırın)"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TouchableOpacity className="bg-yellow-500 p-3 rounded-md mt-6" onPress={handleSubmit} disabled={addCampaign.isPending}>
          <Text className="text-white text-center font-bold">Ekle</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCampaign;
