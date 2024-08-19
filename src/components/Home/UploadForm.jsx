import React, { useState } from 'react';
import useStore from '@/store/store';

const UploadForm = () => {
  const { uploadEntry, uploadError, fetchEntries } = useStore();
  const [uploadFormData, setUploadFormData] = useState({
    association_with_company: '',
    identity_number: '',
    vessel_captured_by_pirates: true,
    name: '',
    last_sighting: '',
    date_of_operation: '',
    area_of_operation: '',
    remarks: '',
    vessel_name: '',
    country: '',
    weapons_details: '',
    naval_ship_name: '',
    file: null,
  });

  const handleFileChange = (e) => {
    setUploadFormData({ ...uploadFormData, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setUploadFormData({ ...uploadFormData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in uploadFormData) {
      formData.append(key, uploadFormData[key]);
    }

    const success = await uploadEntry(formData);
    if (success) {
      setUploadFormData({
        association_with_company: '',
        identity_number: '',
        vessel_captured_by_pirates: true,
        name: '',
        last_sighting: '',
        date_of_operation: '',
        area_of_operation: '',
        remarks: '',
        vessel_name: '',
        country: '',
        weapons_details: '',
        naval_ship_name: '',
        file: null,
      });
      fetchEntries();
    }
  };

  return (
    <form onSubmit={handleUpload} encType="multipart/form-data">
      <div className="bg-gray-100 border border-gray-200 rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Upload Form</h3>
        {/* Form fields... */}
        <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="association_with_company">Association with Company</label>
                <input
                  type="text"
                  id="association_with_company"
                  name="association_with_company"
                  value={uploadFormData.association_with_company}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="identity_number">Identity Number</label>
                <input
                  type="number"
                  id="identity_number"
                  name="identity_number"
                  value={uploadFormData.identity_number}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="vessel_captured_by_pirates">Vessel Captured by Pirates</label>
                <select
                  id="vessel_captured_by_pirates"
                  name="vessel_captured_by_pirates"
                  value={uploadFormData.vessel_captured_by_pirates}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={uploadFormData.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="last_sighting">Last Sighting</label>
                <input
                  type="text"
                  id="last_sighting"
                  name="last_sighting"
                  value={uploadFormData.last_sighting}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="date_of_operation">Date of Operation</label>
                <input
                  type="date"
                  id="date_of_operation"
                  name="date_of_operation"
                  value={uploadFormData.date_of_operation}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="area_of_operation">Area of Operation</label>
                <input
                  type="text"
                  id="area_of_operation"
                  name="area_of_operation"
                  value={uploadFormData.area_of_operation}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  id="remarks"
                  name="remarks"
                  value={uploadFormData.remarks}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="vessel_name">Vessel Name</label>
                <input
                  type="text"
                  id="vessel_name"
                  name="vessel_name"
                  value={uploadFormData.vessel_name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={uploadFormData.country}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="weapons_details">Weapons Details</label>
                <input
                  type="text"
                  id="weapons_details"
                  name="weapons_details"
                  value={uploadFormData.weapons_details}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="naval_ship_name">Naval Ship Name</label>
                <input
                  type="text"
                  id="naval_ship_name"
                  name="naval_ship_name"
                  value={uploadFormData.naval_ship_name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="file">File Upload</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Entry
        </button>
        <button
        disabled
          type="submit"
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
        >
          Run Recognition
          </button>
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      </div>
     
    </form>
  );
};

export default UploadForm;