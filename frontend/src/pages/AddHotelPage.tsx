import { useMutation } from "react-query";
import * as apiClient from "../api-client.ts";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm.tsx";
import { useAppContext } from "../contexts/AppContext.tsx";

const AddHotelPage = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Erron Saving Hotel!", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotelPage;
