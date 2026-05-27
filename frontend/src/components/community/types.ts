export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  format: string;
  category: "Workshops" | "Meditation Circle" | "Webinars" | "Meetups";
  host: string;
  desc: string;
}

export interface MarqueeImage {
  id: string;
  img: string;
}
