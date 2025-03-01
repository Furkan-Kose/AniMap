import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-300 text-gray-800 py-8 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">LOGO</h3>
            <p className="text-gray-800 text-sm">
            Sokak hayvanlarının hayatlarını iyileştirmek için bir araya gelin! Hayvan dostlarımızın fotoğraflarını ve bilgilerini paylaşarak onlara daha iyi bir hayat sunalım.
            </p>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-800 hover:text-yellow-500 text-sm">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/animals" className="text-gray-800 hover:text-yellow-500 text-sm">Hayvanlar</Link>
              </li>
              <li>
                <Link to="/add" className="text-gray-800 hover:text-yellow-500 text-sm">Hayvan Ekle</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">İletişim</h3>
            <p className="text-gray-800 text-sm">
              Email: <a href="mailto:support@example.com" className="text-gray-800 hover:text-yellow-500">support@example.com</a>
            </p>
            <p className="text-gray-800 text-sm">Telefon: +90 123 456 7890</p>
            <div className="mt-4">
              <a href="https://www.facebook.com" className="text-gray-800 hover:text-yellow-500 mx-2">
                Facebook
              </a>
              <a href="https://www.twitter.com" className="text-gray-800 hover:text-yellow-500 mx-2">
                Twitter
              </a>
              <a href="https://www.instagram.com" className="text-gray-800 hover:text-yellow-500 mx-2">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p className="text-gray-800">&copy; 2025 Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
