import { useNavigate } from "react-router-dom";

const PresentersPage = () => {
  const navigate = useNavigate();

  const handleProgramClick = (programId: string) => {
    navigate(`/program/${programId}`);
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-10">
      <h1 className="text-4xl font-black mb-8">Presenters</h1>

      <button
        onClick={() => handleProgramClick("morning-show")}
        className="text-orange-500 hover:underline"
      >
        Go to Morning Show
      </button>
    </div>
  );
};

export default PresentersPage;
