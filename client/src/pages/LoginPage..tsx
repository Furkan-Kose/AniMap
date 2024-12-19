import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const loginUser = async (userData: any) => {
  const response = await axios.post("http://localhost:3000/users/login", userData, {withCredentials: true});
  return response.data;
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("User logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const userData = { email, password };
    login(userData);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-2xl font-bold text-yellow-500 text-center">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 py-8 w-2/3 md:w-1/2 mx-auto">
        <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {isError && <p className="text-red-500 text-center">{error.message}</p>}
    </div>
  );
};

export default LoginPage;