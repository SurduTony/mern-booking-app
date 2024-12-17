import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate: signOut } = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "Sign out successful", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    signOut();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center bg-blue-600 text-white px-3 font-bold hover:bg-gray-100 hover:text-blue-800"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
