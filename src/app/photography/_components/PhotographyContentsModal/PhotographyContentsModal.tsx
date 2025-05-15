"use client";
import Image from "next/image";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNavigation: boolean;
}

const PhotographyContentsModal: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onPrev,
  onNext,
  hasNavigation,
}) => {
  // Don't render modal if it's closed or no image source is provided
  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>

      <div className="relative flex items-center">
        <div className=" relative mx-12 aspect-[4/5] h-[50dvh] sm:h-[70dvh]">
          <Image
            src={imageSrc}
            alt="Modal Image"
            fill
            sizes="40dvw"
            className="object-contain"
          />
        </div>
      </div>

      {hasNavigation && (
        <button
          onClick={onPrev}
          className="absolute inset-y-0 left-4 z-10 flex items-center text-4xl text-white hover:opacity-80 sm:text-6xl "
        >
          〈
        </button>
      )}

      {hasNavigation && (
        <button
          onClick={onNext}
          className="absolute inset-y-0 right-4 z-10 flex items-center text-4xl text-white hover:opacity-80 sm:text-6xl"
        >
          〉
        </button>
      )}

      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-2xl text-white hover:opacity-80 sm:text-4xl"
      >
        X
      </button>
    </div>
  );
};

export default PhotographyContentsModal;
