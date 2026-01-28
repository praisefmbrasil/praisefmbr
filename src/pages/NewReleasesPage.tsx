import { ArrowLeft, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewReleasesPage: React.FC = () => {
  const navigate = useNavigate();

  const releases = [
    { id: '1', title: 'Graça Abundante', artist: 'Praise Music', year: '2026' },
    { id: '2', title: 'Coração Contrito', artist: 'Samuel Andrade', year: '2025' },
  ];

  return (
    <div className="min-h-screen bg-black px-6 lg:px-12 pt-10 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-orange-500 flex items-center mb-3"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </button>

          <h1 className="text-5xl font-black tracking-tight">
            New Releases
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl">
            Discover the latest Christian music releases from Brazil and around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {releases.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/50">
                  <PlayCircle size={54} className="text-orange-500" />
                </div>
              </div>

              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.artist}</p>
              <p className="text-xs text-orange-500 font-bold mt-1">
                {item.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;
