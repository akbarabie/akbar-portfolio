"use client";

import { useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import type { ProjectLinks } from "@/types/project";

interface LiveDemoButtonProps {
  links: ProjectLinks;
  labels: {
    viewLiveDemo: string;
    closeVideo: string;
  };
}

export function LiveDemoButton({ links, labels }: LiveDemoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (links.demoVideo) {
    const { type, src } = links.demoVideo;

    return (
      <>
        <Button type="button" onClick={() => setIsOpen(true)}>
          <Play className="size-4" />
          {labels.viewLiveDemo}
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen} ariaLabel={labels.viewLiveDemo}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={labels.closeVideo}
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
            >
              <X className="size-4" />
            </button>

            {isOpen &&
              (type === "file" ? (
                <video
                    className="aspect-video w-full rounded-2xl bg-black object-contain"
                    src={src}
                    controls
                    autoPlay
                    loop
                    playsInline
                />
              ) : (
                <iframe
                  className="aspect-video w-full rounded-2xl"
                  src={
                    type === "youtube"
                      ? `https://www.youtube-nocookie.com/embed/${src}?autoplay=1`
                      : `https://player.vimeo.com/video/${src}?autoplay=1`
                  }
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={labels.viewLiveDemo}
                />
              ))}
          </div>
        </Dialog>
      </>
    );
  }

  if (links.liveDemo) {
    return (
      <Button asChild>
        <a href={links.liveDemo} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="size-4" />
          {labels.viewLiveDemo}
        </a>
      </Button>
    );
  }

  return null;
}