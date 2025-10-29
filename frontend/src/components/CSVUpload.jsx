import React, { useState, useRef } from 'react';
import { uploadEquipmentCSV, uploadWeatherCSV } from '../services/services';

const CSVUpload = ({ type, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith('.csv')) {
        setUploadStatus({
          success: false,
          message: 'Please select a CSV file'
        });
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        success: false,
        message: 'Please select a file first'
      });
      return;
    }

    setUploading(true);

    try {
      const result = type === 'equipment' 
        ? await uploadEquipmentCSV(selectedFile)
        : await uploadWeatherCSV(selectedFile);

      if (result.success) {
        setUploadStatus({
          success: true,
          message: result.message,
          stats: result
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        setUploadStatus({
          success: false,
          message: result.error || 'Upload failed'
        });
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: error.response?.data?.error || error.message || 'Upload failed'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadStatus(null);
  };

  const handleCloseStatus = () => {
    setUploadStatus(null);
  };

  return (
    <div className="mb-6 p-4 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg">
      <div className="flex flex-wrap items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={handleButtonClick}
          className="px-6 py-2 bg-[#5682B1] hover:bg-[#4a7199] text-[#FFE8DB] font-medium rounded-lg transition-colors border border-[#5682B1]"
        >
          Choose CSV File
        </button>

        {selectedFile && (
          <>
            <span className="text-[#b8b8b8] text-sm">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </span>

            <button
              onClick={handleRemoveFile}
              className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#f87171] font-medium rounded-lg transition-colors border border-[#3a3a3a]"
            >
              Remove
            </button>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                uploading
                  ? 'bg-[#2a2a2a] text-[#666666] cursor-not-allowed'
                  : 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#5682B1] border border-[#2a2a2a]'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </>
        )}
      </div>

      {uploadStatus && (
        <div
          className={`mt-4 p-3 rounded-lg border ${
            uploadStatus.success
              ? ' border-[#1a5f3a] text-[#4ade80]'
              : 'bg-[#2f0a0a] border-[#5f1a1a] text-[#f87171]'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-medium">
                {uploadStatus.message}
              </p>
              
              {uploadStatus.success && uploadStatus.stats && (
                <div className="mt-2 text-sm opacity-90">
                  <p>
                    Total: {uploadStatus.stats.total} | 
                    Inserted: {uploadStatus.stats.inserted} | 
                    Updated: {uploadStatus.stats.updated}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleCloseStatus}
              className="text-current hover:opacity-70 transition-opacity font-bold text-lg"
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
