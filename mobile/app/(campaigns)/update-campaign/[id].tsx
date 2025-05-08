import { Text, ScrollView, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useCampaigns } from "@/hooks/useCampaigns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

const UpdateCampaign = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const { updateCampaign, campaign, isCampaignLoading, campaignError } = useCampaigns(id);
  const { user } = useAuth();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    image: "",
    goalAmount: "",
    endDate: "",
    tags: "",
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        ...campaign,
        tags: campaign.tags?.join(", ") || "",
      });
    }
  }, [campaign]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedEndDate = new Date(formData.endDate.split("/").reverse().join("-")).toISOString();
    const data = {
      ...formData,
      endDate: formattedEndDate,
      goalAmount: parseFloat(formData.goalAmount),
      tags: formData.tags?.split(",").map((tag: string) => tag.trim()),
      organization: user?._id,
    };

    updateCampaign.mutate(data, {
      onSuccess: () => {
        router.push("/campaigns");
      },
    });
  };

    const handleDateChange = (event: any, date?: Date) => {
        if (event.type === "set" && date) {
        setSelectedDate(date);
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        handleChange("endDate", formattedDate);
        }
        setShowDatePicker(false);
    };

  if (isCampaignLoading) return <Text>Loading...</Text>;
  if (campaignError) return <Text className="text-center text-red-500">Error: {campaignError.message}</Text>;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        <Text className="text-2xl font-bold text-center mb-4">Kampanya Güncelle</Text>

        <TextInput
          value={formData.title}
          onChangeText={(value) => handleChange("title", value)}
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={formData.description}
          onChangeText={(value) => handleChange("description", value)}
          placeholder="Açıklama"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={formData.image}
          onChangeText={(value) => handleChange("image", value)}
          placeholder="Resim URL"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={formData.goalAmount.toString()}
          onChangeText={(value) => handleChange("goalAmount", value)}
          placeholder="Hedef Tutar"
          keyboardType="numeric"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View pointerEvents="none">
            <TextInput
              value={formData.endDate}
              onChangeText={(value) => handleChange("endDate", value)}
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
          value={formData.tags}
          onChangeText={(value) => handleChange("tags", value)}
          placeholder="Etiketler (virgülle ayırın)"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TouchableOpacity className="bg-yellow-500 p-3 rounded-md mt-6" onPress={handleSubmit} disabled={updateCampaign.isPending}>
          <Text className="text-white text-center font-bold">Güncelle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateCampaign;
