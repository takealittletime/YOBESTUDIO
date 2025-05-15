"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";

import PhotographyContentsModal from "../PhotographyContentsModal/PhotographyContentsModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function PhotographyContents() {
  const [folderThumbs, setFolderThumbs] = useState<
    { folder: string; thumbUrl: string }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track loaded thumbnail URLs for shimmer effect
  const [loadedThumbs, setLoadedThumbs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchThumbs = async () => {
      const { data: folders, error } = await supabase.storage
        .from("ybst-photo")
        .list("", { limit: 100, sortBy: { column: "name", order: "asc" } });

      if (error) {
        return;
      }

      const folderNames = folders
        .filter(
          (item) =>
            item.name !== "0" && item.name !== "" && item.name.match(/^\d+$/),
        )
        .map((item) => item.name);

      const thumbs = (
        await Promise.all(
          folderNames.map(async (folder) => {
            const { data: publicData } = supabase.storage
              .from("ybst-photo")
              .getPublicUrl(`${folder}/1.jpg`);

            const thumbUrl = publicData?.publicUrl;
            if (!thumbUrl) return null;

            return {
              folder,
              thumbUrl,
            };
          }),
        )
      ).filter((thumb) => thumb !== null);

      setFolderThumbs(thumbs);
    };

    fetchThumbs();
  }, []);

  const openModal = async (folder: string) => {
    const { data, error } = await supabase.storage
      .from("ybst-photo")
      .list(folder);
    if (data) {
      const sortedFiles = data
        .filter((file) => file.name.endsWith(".jpg"))
        .sort(
          (a, b) => Number(a.name.split(".")[0]) - Number(b.name.split(".")[0]),
        )
        .map((file) => {
          const publicUrlData = supabase.storage
            .from("ybst-photo")
            .getPublicUrl(`${folder}/${file.name}`);
          const url = publicUrlData?.data?.publicUrl;
          return url || "";
        })
        .filter((url) => url !== "");
      setCurrentImages(sortedFiles);
      setCurrentIndex(0);
      setModalOpen(true);
    }
  };

  const onPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length,
    );
  };
  const onNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1 bg-black p-3 sm:grid-cols-3">
        {folderThumbs
          .filter(({ thumbUrl }) => thumbUrl !== "")
          .map(({ folder, thumbUrl }, index) => (
            <div
              key={index}
              className="group relative aspect-[285/356] w-full cursor-pointer bg-slate-300"
              onClick={() => openModal(folder)}
            >
              <div className="relative size-full">
                <Image
                  src={thumbUrl}
                  alt={`Folder ${folder}`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 285px"
                  className="z-10 size-full object-cover"
                  onLoad={() =>
                    setLoadedThumbs((prev) => new Set(prev).add(thumbUrl))
                  }
                />
              </div>
              <div className="absolute inset-0 z-50 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-30"></div>
            </div>
          ))}
      </div>

      {/* 모달 컴포넌트 */}
      <PhotographyContentsModal
        isOpen={modalOpen}
        imageSrc={currentImages[currentIndex]}
        onClose={() => setModalOpen(false)}
        onPrev={onPrev}
        onNext={onNext}
        hasNavigation={currentImages.length > 1}
      />
    </>
  );
}
