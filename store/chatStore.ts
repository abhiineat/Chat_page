import { create } from 'zustand';
import axios from 'axios';

interface Sender {
  image: string;
  is_kyc_verified: boolean;
  self: boolean;
  user_id: string;
}

export interface Message {
  id: string;
  message: string;
  sender: Sender;
  time: string;
}

interface TripDetails {
  name: string;
  from: string;
  to: string;
}

interface ChatStore {
  messages: Message[];
  page: number;
  isLoading: boolean;
  tripDetails: TripDetails | null;
  fetchMessages: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  page: 0,
  isLoading: false,
  tripDetails: null,

  fetchMessages: async () => {
    const { page, messages, isLoading } = get();

    if (isLoading) return;

    set({ isLoading: true });

    try {
      const res = await axios.get(`https://qa.corider.in/assignment/chat?page=${page}`);
      const data = res.data;

      set({
        messages: [...messages, ...data.chats],
        page: page + 1,
        tripDetails: {
          name: data.name,
          from: data.from,
          to: data.to,
        },
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      set({ isLoading: false });
    }
  },
}));
