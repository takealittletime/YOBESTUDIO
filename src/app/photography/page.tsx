import Header from "@/components/ui/header/header";

import PhotographyContents from "./_components/PhotographyContents/page";

export default function Photography() {
  return (
    <div className="custom-scrollbar flex h-full flex-col text-{HelveticaWorld.variable}">
      <Header />
      <div className="flex h-full flex-col bg-black">
        <div className="my-3 flex justify-between p-3">
          <p className="text-5xl font-bold">Photography</p>
          <p>where style meets your vision</p>
        </div>
        <PhotographyContents />
      </div>
    </div>
  );
}
