import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaSave } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { apiURL } from "../lib/api";

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "")

  useEffect(() => {
      if (user) {
        setUsername(user.username);
        setEmail(user.email);
      }
    }, [user]);

  const mutation = useMutation({
      mutationFn: async (updatedUser) => {
        return axios.put(`${apiURL}/users/${user?._id}`, updatedUser, { withCredentials: true });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("Kullanıcı başarıyla güncellendi.");
        navigate("/profile");
      },
      onError: (error) => {
        console.log("error" + error);
        toast.error("Kullanıcı güncellenirken bir hata oluştu.");
      },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!email || !username) {
          toast.error("Kullanıcı adı ve e-posta gerekli!");
          return;
        }
    
        const updatedUser: any = { email, username };
        if (password) updatedUser.password = password; 
    
        mutation.mutate(updatedUser);
    };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-8">Profili Güncelle</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              placeholder="Şifre"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>          

          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
          >
            <FaSave className="text-xl" />
            Kaydet
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
