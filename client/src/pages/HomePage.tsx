import Loading from "../components/Loading";
import AnimalMap from "../components/AnimalMap";
import AnimalCard from "../components/AnimalCard";
import { Link } from "react-router";
import { motion } from "motion/react"
import { useAnimals } from "../hooks/useAnimals";

const HomePage = () => {
  const { animals, isLoading, error } = useAnimals();

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loading /></div>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div>

      {/* HERO */}
      <section className="relative flex flex-col md:flex-row bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-100 h-[75vh] overflow-hidden">
        {/* LEFT */}
        <motion.div 
          className="flex flex-1 flex-col justify-center gap-6 px-6 md:px-16 xl:px-32"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Sokak Hayvanlarına <span className="text-yellow-600">Destek Ol!</span>
          </h1>
          <p className="text-lg text-gray-700">
          Birlikte sokak hayvanlarının hayatlarını iyileştirebiliriz. Fotoğraflarını ve bilgilerini paylaşarak onlara yardım eli uzat!
          </p>
          <Link to="/add" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg w-fit transition">
            Hayvan Ekle
          </Link>
        </motion.div>

        {/* RIGHT */}
        <motion.div 
          className="hidden md:flex flex-1 items-center justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <img src="https://pngimg.com/uploads/dog/dog_PNG50318.png" alt="Hero" className="w-full h-80 object-contain drop-shadow-lg" />
          <div className="absolute bottom-8 right-8 bg-white rounded-xl p-4 shadow-lg text-sm text-gray-600">
            <strong>{animals.length} </strong>Hayvan listelendi!
          </div>
        </motion.div>

        {/* EĞİMLİ ALT KISIM */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-0 rotate-180">
          <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-[70px]">
            <path d="M0,0 C150,50 350,0 500,50 L500,0 L0,0 Z" fill="#FFFBEB"></path>
          </svg>
        </div>
      </section>


      {/* ANIMALS LIST */}
      <section className="pt-8">
        <h1 className="text-3xl font-bold text-center text-yellow-500">Hayvanlar</h1>
        {animals.length === 0 ? (
        <p className="text-gray-500 text-center py-20 text-lg">
          Henüz hayvan bulunmamaktadır.
        </p>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          {animals.map((animal: any) => (
            <AnimalCard key={animal._id} animal={animal} />
          ))}
        </div>
        )}
      </section>

      {/* MAP */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-yellow-500 pt-8">Harita</h1>
        <AnimalMap animals={animals} />
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-yellow-50 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-12">Nasıl Kullanılır?</h1>
        
        <div className="grid md:grid-cols-4 gap-12 text-center">
          
          {/* Step 1 - Hayvan Ekle */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white rounded-full p-4 shadow-lg mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Hayvan Ekle</h2>
            <p>Sokakta gördüğünüz yardıma muhtaç hayvanları konum ve açıklama ile sisteme ekleyin.</p>
          </div>

          {/* Step 2 - Haritada Gör */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white rounded-full p-4 shadow-lg mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10H7l5-5m0 10l-5-5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Haritada Gör</h2>
            <p>Yakınınızdaki hayvanları keşfedin ve durumlarını kolayca takip edin.</p>
          </div>

          {/* Step 3 - Yardım Et */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white rounded-full p-4 shadow-lg mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Yardım Et</h2>
            <p>Mama bırakın, barınakla iletişime geçin ya da sahiplendirme sürecine destek olun.</p>
          </div>

          {/* Step 4 - Bağış Yap */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white rounded-full p-4 shadow-lg mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8c-1.657 0-3 1.343-3 3 0 1.305.835 2.417 2 2.83V17h2v-3.17c1.165-.413 2-1.525 2-2.83 0-1.657-1.343-3-3-3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Bağış Yap</h2>
            <p>Projeye destek olmak için bağış yaparak daha çok hayvana ulaşmamıza yardımcı olun.</p>
          </div>

        </div>
      </section>

      {/* MOBILE APP SECTION */}
      <section className="bg-gray-50 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          {/* LEFT - TEXT */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-600">
              Sokak Dostlarımız Cebinizde!
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              Uygulamamızı indirerek sokaktaki dostlarımız için hızlıca bildirim yapabilir ve onlara yardım edebilirsiniz.
            </p>
            <a 
              href="#" 
              className="bg-green-600 hover:bg-green-700 transition-all text-white px-10 py-4 rounded-2xl text-lg inline-flex items-center gap-4 shadow-xl"
            >
              Google Play’den İndir
            </a>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <img 
              src="mobile.png" 
              alt="Mobil Uygulama Görseli"
              className="w-36 md:w-48 rounded-xl shadow-xl transition-all transform hover:scale-105"
            />
          </div>

        </div>
      </section>


    </div>
  );
};

export default HomePage;
