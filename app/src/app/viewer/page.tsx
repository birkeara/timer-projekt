/* #Viewer timer visning# */
const MinimalPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Opret ny timer</h1>
      <p className="text-gray-600 mb-6">Her kan du oprette en ny timer.</p>

      <div className="space-y-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Knap 1
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Knap 2
        </button>
      </div>
    </div>
  );
};

export default MinimalPage;
