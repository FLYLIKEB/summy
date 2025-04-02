import { useState, useRef } from 'react';
import { SUPPORTED_FILE_TYPES } from '../constants';

/**
 * 파일 업로드 기능을 관리하는 커스텀 훅
 * 드래그 앤 드롭과 파일 선택 기능을 제공합니다.
 * 
 * @returns {Object} 파일 업로드 관련 상태와 핸들러
 */
export const useFileUpload = () => {
  // 드래그 앤 드롭 상태
  const [isDragging, setIsDragging] = useState(false);
  // 업로드된 파일의 내용
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  // 업로드된 파일의 이름
  const [fileName, setFileName] = useState<string | null>(null);
  // 파일 입력 요소에 대한 참조
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 파일이 드래그되어 영역 위에 있을 때의 핸들러
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * 파일이 드래그되어 영역을 벗어날 때의 핸들러
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * 파일을 읽어서 텍스트로 변환하는 함수
   * EUC-KR 인코딩을 사용하여 한글 파일도 정상적으로 읽을 수 있습니다.
   * 
   * @param file - 읽을 파일 객체
   * @returns Promise<string> 파일의 텍스트 내용
   */
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

  /**
   * 파일이 드롭되었을 때의 핸들러
   * 파일 형식을 검사하고 내용을 읽어옵니다.
   */
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

  /**
   * 파일 입력 요소를 통해 파일이 선택되었을 때의 핸들러
   */
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

  /**
   * 업로드된 파일을 제거하는 핸들러
   */
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * 파일 업로드 상태를 초기화하는 함수
   */
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