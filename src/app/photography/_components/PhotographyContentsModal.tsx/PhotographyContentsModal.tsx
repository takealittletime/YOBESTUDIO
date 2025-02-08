"use client";
import Image from "next/image";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PhotographyContentsModal: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 반투명 검정 오버레이 */}
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>

      {/* 왼쪽 내비게이션 버튼 */}
      <button
        onClick={onPrev}
        className="absolute inset-y-0 left-4 flex items-center text-4xl text-[rgba(255,255,255,0.8)] hover:text-white"
      >
        ←
      </button>

      {/* 오른쪽 내비게이션 버튼 */}
      <button
        onClick={onNext}
        className="absolute inset-y-0 right-4 flex items-center text-4xl text-[rgba(255,255,255,0.8)] hover:text-white"
      >
        →
      </button>

      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-2xl text-[rgba(255,255,255,0.8)] hover:text-white"
      >
        X
      </button>

      {/* 모달 콘텐츠 영역 */}
      <div className="relative z-10 flex items-center">
        {/* 중앙 이미지 컨테이너 */}
        <div className="relative mx-12 aspect-[4/5] h-[90dvh]">
          <Image
            src={imageSrc}
            alt="Modal Image"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotographyContentsModal;
