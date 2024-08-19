import React from 'react';
import useStore from '@/store/store';

const EntriesTable = () => {
  const { entries } = useStore();

  const handleImagePreview = (filePath) => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL_v2}/${filePath}`, '_blank');
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded p-4 max-w-full">
      <h3 className="text-xl font-semibold mb-4">Previous Entries</h3>
      <div className="overflow-x-auto">
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">File Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                    No entries available
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-4 whitespace-nowrap">{entry.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleImagePreview(entry.file_path)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntriesTable;
