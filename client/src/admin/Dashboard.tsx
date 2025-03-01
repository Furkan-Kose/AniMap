import { useQuery } from '@tanstack/react-query';
import { FaUser, FaDog, FaChartLine, FaCog } from 'react-icons/fa';
import { fetchAnimals, fetchUsers } from '../lib/api';
import Loading from '../components/Loading';

const Dashboard = () => {

  const { isPending, error, data: animals } = useQuery({
    queryKey: ["animals"],
    queryFn: () => fetchAnimals(),
  });

  const { isPending: isPendingUser, error: errorUser, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  if (isPending) return <Loading />;

  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  if (isPendingUser) return <Loading />;

  if (errorUser) return <p className="text-center text-red-500">Error: {errorUser.message}</p>;

  return (
    <div className="p-8 space-y-8">
      {/* Başlık */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel - Anasayfa</h1>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Toplam Kullanıcı</h2>
            <p className="text-2xl text-gray-900">{users.length}</p>
          </div>
          <FaUser className="text-4xl text-blue-500" />
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Toplam Hayvan</h2>
            <p className="text-2xl text-gray-900">{animals.length}</p>
          </div>
          <FaDog className="text-4xl text-green-500" />
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Son Eklenenler</h2>
            <p className="text-2xl text-gray-900">30</p>
          </div>
          <FaChartLine className="text-4xl text-yellow-500" />
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Ayarlar</h2>
          </div>
          <FaCog className="text-4xl text-gray-500" />
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
