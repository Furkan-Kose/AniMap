import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";


const Header = () => {
  const { user, logoutFunc } = useAuth();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutFunc,
    onSuccess: () => {
      toast.success("Successfully logged out!");
      queryClient.resetQueries({ queryKey: ["user"] });
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed!");
    },
  });


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
              {user.username}
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
