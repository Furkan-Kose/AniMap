import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import Loading from "./Loading";
import useUserStore from "../stores/UserStore";

const logoutUser = async () => {
  const response = await axios.post(
    "http://localhost:3000/users/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
};

const fetchUser = async () => {
  const response = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
  return response.data;
};

const Header = () => {
  const { user, setUser } = useUserStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    onSuccess: (data: any) => {
      if (data) setUser(data);
    },
    onError: () => {
      setUser(null);
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Successfully logged out!");
      queryClient.resetQueries({ queryKey: ["user"] });
      setUser(null);
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed!");
    },
  });

  console.log("user"+user);
  console.log("username"+user?.user.username);
  console.log("data"+data);

  // if (isPending) return <Loading />;

  return (
    <div className="flex items-center justify-center gap-8 h-20">
      <Link to="/" className="text-2xl font-bold text-gray-800 hover:underline">
        Ana Sayfa
      </Link>
      <Link to="/add" className="text-2xl font-bold text-gray-800 hover:underline">
        Hayvan Ekle
      </Link>
      {
        user ? (
          <>
            <Link to="/profile" className="text-2xl font-bold text-gray-800 hover:underline">
              {user.user.username}
            </Link>
            <button
              onClick={() => logout()}
              className="text-2xl font-bold text-gray-800 hover:underline"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-2xl font-bold text-gray-800 hover:underline">
              Giriş Yap
            </Link>
            <Link to="/register" className="text-2xl font-bold text-gray-800 hover:underline">
              Kayıt Ol
            </Link>
          </>
        )
      }
    </div>
  );
};

export default Header;
