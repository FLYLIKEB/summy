import { useState, useRef } from 'react';
import { SUPPORTED_FILE_TYPES } from '../constants';

export const useFileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      reader.readAsText(file, 'EUC-KR');
    });
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!Object.values(SUPPORTED_FILE_TYPES).includes(`.${file.name.split('.').pop()}`)) {
      alert('지원하지 않는 파일 형식입니다.');
      return;
    }

    try {
      const text = await readFile(file);
      console.log('파일 내용:', text);
      setUploadedFile(text);
      setFileName(file.name);
    } catch (error) {
      console.error('파일 읽기 오류:', error);
      alert('파일을 읽는 중 오류가 발생했습니다.');
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!Object.values(SUPPORTED_FILE_TYPES).includes(`.${file.name.split('.').pop()}`)) {
      alert('지원하지 않는 파일 형식입니다.');
      return;
    }

    try {
      const text = await readFile(file);
      console.log('파일 내용:', text);
      setUploadedFile(text);
      setFileName(file.name);
    } catch (error) {
      console.error('파일 읽기 오류:', error);
      alert('파일을 읽는 중 오류가 발생했습니다.');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetFileUpload = () => {
    setUploadedFile(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    isDragging,
    uploadedFile,
    fileName,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleRemoveFile,
    resetFileUpload
  };
}; 