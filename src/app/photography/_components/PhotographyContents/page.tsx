"use client";
import Image from "next/image";
import { useState } from "react";

import PhotographyContentsModal from "../PhotographyContentsModal.tsx/PhotographyContentsModal";

export default function PhotographyContents() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("/photography/1-1.jpg");
  const images = [
    "/photography/1-1.jpg",
    "/photography/2-1-1.jpg",
    "/photography/3-1.jpg",
    "/photography/HTL_1-1.jpg",
    "/photography/HTL_2-1.jpg",
    "/photography/HTL_3-1.jpg",
    "/photography/HTL_4-1.jpg",
    "/photography/HTL_5-1.jpg",
    "/photography/HTL_6-1.jpg",
  ];

  const openModal = (src: string) => {
    setCurrentImage(src);
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const onPrev = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prevIndex]);
  };

  const onNext = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-1 bg-black p-3">
        {images.map((src, index) => (
          <div
            key={index}
            className="group relative aspect-[285/356] w-full cursor-pointer bg-slate-300"
            onClick={() => openModal(src)}
          >
            <Image
              src={src}
              alt={`${index + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-50"></div>
          </div>
        ))}
      </div>

      {/* 모달 컴포넌트 */}
      <PhotographyContentsModal
        isOpen={modalOpen}
        imageSrc={currentImage}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
}
