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
    <div className="h-screen flex-col bg-black">
      <div className="relative bg-black p-8 pb-20">
        {publicUrl ? (
          <video
            autoPlay
            muted
            playsInline
            loop
            className="absolute left-0 top-0 h-screen object-cover"
            src={publicUrl}
          />
        ) : (
          <div className="size-full bg-black"></div>
        )}
        <div className="items-left absolute left-0 top-0 z-10 flex h-screen w-screen flex-col justify-center bg-black/80">
          <span className="text-8xl">YOBE STUDIO</span>
          <div className="text-4xl text-white">
            <Link href="/photography">
              <span className="cursor-pointer text-white hover:text-zinc-50 hover:opacity-20">
                Click Here
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
