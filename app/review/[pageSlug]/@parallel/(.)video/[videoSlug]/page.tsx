import { Metadata } from "next";
import { getVideoDataBySlug } from "@/app/utils/api";
import { getMetaFromVideo } from "../../../../../utils/metadata";
import Modal from "../../../../../components/Modal";

type Props = {
  params: {
    // lang: string,
    videoSlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { videoSlug } = params;

  if (videoSlug) {
    const videoInfo = await getVideoDataBySlug(videoSlug, false);

    const videoMetadata = getMetaFromVideo(
      videoInfo?.attributes?.video_name || videoSlug,
      "pageSlug"
    );
    return {
      title: videoMetadata.title,
      description: videoMetadata.description,
    };
  }

  return {
    title: "",
    description: "",
  };
}

export default async function PageRoute({ params }: Props) {
  const { videoSlug } = params;

  if (!videoSlug) return;
  const video = await getVideoDataBySlug(videoSlug);

  return <Modal video={video} />;
}
