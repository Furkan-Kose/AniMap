import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logoutFunc } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent shadow-sm"
      } sticky top-0 z-50`}
    >
      <div className="max-w-screen-xl mx-auto py-4 md:py-6 px-4 md:px-8 lg:px-16 flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="text-3xl font-semibold tracking-wider uppercase">
          <Link to="/" className="text-gray-800 hover:text-gray-600">
            Logo
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/" className="text-gray-800 hover:text-gray-600">
            Ana Sayfa
          </Link>
          <Link to="/animals" className="text-gray-800 hover:text-gray-600">
            Hayvanlar
          </Link>
          <Link to="/add" className="text-gray-800 hover:text-gray-600">
            Hayvan Ekle
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-800 hover:text-gray-600"
              >
                {user.username}
              </Link>
              <button
                onClick={() => logout()}
                className="text-gray-800 hover:text-gray-600"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-600"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="text-gray-800 hover:text-gray-600"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`transition-all duration-300 ease-in-out ${
            isScrolled ? "bg-white shadow-lg" : "bg-transparent"
          } md:hidden text-gray-800 p-4`}
        >
          <nav className="flex flex-col gap-6 text-lg font-medium items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/animals"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Hayvanlar
            </Link>
            <Link
              to="/add"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Hayvan Ekle
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-800 hover:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.username}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-gray-600"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
