import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { roleOptions } from "../constants/data";
import Select from "react-select";
import { useState } from "react";
import { apiURL } from "../lib/api";



const AdminAddUserPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (userData) => {
        return axios.post(`${apiURL}/users`, userData, { withCredentials: true });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("Kullanıcı başarıyla eklendi.");
        navigate("/admin/users");
      },
      onError: (error) => {
        console.log("error" + error);
        toast.error("Kullanıcı eklenirken bir hata oluştu.");
      },
    });
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email || !password || !username) {
        toast.error("All fields are required!");
        return;
      }
  
      const userData: any = { email, password, username, role };
  
      mutation.mutate(userData); 
    };
  
  return (
    <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin - Kullanıcı Ekle</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8 w-3/4">
        <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Kullanıcı Adı" className="border p-2 rounded-md" />
        <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="E Posta" className="border p-2 rounded-md" />
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Şifre" className="border p-2 rounded-md" />
        <Select name="role" options={roleOptions} onChange={(e: any) => setRole(e.value)}  placeholder="Rol Seç" className="react-select-container" classNamePrefix="react-select" />
        <button disabled={mutation.isPending} type="submit" className="bg-blue-500 text-white p-2 rounded-md">Ekle</button>
      </form>

    </div>
  )
}

export default AdminAddUserPage