import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-gray-900 py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LOGO & AÇIKLAMA */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🐾 Destek Ol!</h2>
          <p className="text-sm leading-relaxed">
            Sokak hayvanlarına destek olmak için bir araya geliyoruz.
            Hayvan dostlarımızın fotoğraflarını ve bilgilerini paylaşarak
            onlara yuva bulmalarına yardım edelim.
          </p>
        </div>

        {/* LİNKLER */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Ana Sayfa</Link></li>
            <li><Link to="/animals" className="hover:text-white transition">Hayvanlar</Link></li>
            <li><Link to="/add" className="hover:text-white transition">Hayvan Ekle</Link></li>
          </ul>
        </div>

        {/* İLETİŞİM & SOSYAL */}
        <div>
          <h3 className="text-lg font-semibold mb-4">İletişim</h3>
          <p className="text-sm mb-2">📧 support@example.com</p>
          <p className="text-sm mb-4">📞 +90 123 456 7890</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
        </div>

      </div>

      {/* ALT BİLGİ */}
      <div className="border-t border-yellow-300 mt-12 pt-4 text-center text-sm text-gray-800">
        &copy; 2025 Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
