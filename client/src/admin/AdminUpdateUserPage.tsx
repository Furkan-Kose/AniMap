import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { roleOptions } from "../constants/data";
import Select from "react-select";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const AdminUpdateUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async (updatedUser) => {
      return axios.put(`http://localhost:3000/users/${id}`, updatedUser, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Kullanıcı başarıyla güncellendi.");
      navigate("/admin/users");
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

    const updatedUser: any = { email, username, role };
    if (password) updatedUser.password = password; 

    mutation.mutate(updatedUser);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin - Kullanıcı Güncelle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8 w-3/4">
        <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Kullanıcı Adı" className="border p-2 rounded-md" />
        <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="E Posta" className="border p-2 rounded-md" />
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Yeni Şifre (Opsiyonel)" className="border p-2 rounded-md" />
        <Select name="role" value={roleOptions.find(option => option.value === role)} onChange={(e: any) => setRole(e.value)} options={roleOptions} placeholder="Rol Seç" className="react-select-container" classNamePrefix="react-select" />
        <button disabled={mutation.isPending} type="submit" className="bg-blue-500 text-white p-2 rounded-md">Güncelle</button>
      </form>
    </div>
  );
};

export default AdminUpdateUserPage;
