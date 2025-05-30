import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

import Footer from "@/components/ui/footer/footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function HomeContent() {
  const { data: videoList, error } = await supabase.storage
    .from("ybst-photo")
    .list("videos", { limit: 10 });

  const publicUrl = videoList?.[0]
    ? supabase.storage
        .from("ybst-photo")
        .getPublicUrl(`videos/${videoList[0].name}`).data.publicUrl
    : null;

  return (
    <div className="min-h-screen bg-black">
      <div className="relative bg-black">
        {publicUrl ? (
          <video
            autoPlay
            muted
            playsInline
            loop
            className="absolute left-0 top-0 h-screen w-screen object-cover"
            src={publicUrl}
          />
        ) : (
          <div className="size-full bg-black"></div>
        )}
        <div className="items-left absolute left-0 top-0 z-10 flex h-screen w-screen flex-col justify-center bg-black/80">
          <span className="text-8xl">YOBE STUDIO</span>
          <div className="text-4xl text-white">
            <span>Click</span>
            <Link href="/photography">
              <span
                className="
              cursor-pointer hover:text-zinc-50 hover:opacity-20"
                style={{ color: "rgba(0,71,255,1)" }}
              >
                Here
              </span>
            </Link>
            <span> to start your journey...</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
