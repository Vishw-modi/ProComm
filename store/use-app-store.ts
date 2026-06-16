"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AIResponse,
  FormData,
  HistoryEntry,
  Template,
  FavoriteOutput,
  VariantTab,
  ToneOption,
  CommunicationType,
} from "@/lib/types";
import { DEFAULT_FORM_VALUES } from "@/lib/constants";

// Generate unique IDs
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

interface AppState {
  // Form state
  formData: FormData;
  setFormField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  resetForm: () => void;
  loadFormData: (data: Partial<FormData>) => void;

  // AI state
  isLoading: boolean;
  response: AIResponse | null;
  error: string | null;
  activeVariant: VariantTab;
  setIsLoading: (loading: boolean) => void;
  setResponse: (response: AIResponse | null) => void;
  setError: (error: string | null) => void;
  setActiveVariant: (variant: VariantTab) => void;

  // History state
  history: HistoryEntry[];
  addToHistory: (entry: Omit<HistoryEntry, "id" | "timestamp">) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;

  // Templates state
  templates: Template[];
  addTemplate: (name: string, formData: Omit<FormData, "message">) => void;
  removeTemplate: (id: string) => void;

  // Favorites state
  favorites: FavoriteOutput[];
  addFavorite: (
    message: string,
    variant: VariantTab,
    communicationType: CommunicationType
  ) => void;
  removeFavorite: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Form state
      formData: { ...DEFAULT_FORM_VALUES },
      setFormField: (key, value) =>
        set((state) => ({
          formData: { ...state.formData, [key]: value },
        })),
      resetForm: () => set({ formData: { ...DEFAULT_FORM_VALUES } }),
      loadFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      // AI state
      isLoading: false,
      response: null,
      error: null,
      activeVariant: "A",
      setIsLoading: (loading) => set({ isLoading: loading }),
      setResponse: (response) => set({ response }),
      setError: (error) => set({ error }),
      setActiveVariant: (variant) => set({ activeVariant: variant }),

      // History state
      history: [],
      addToHistory: (entry) =>
        set((state) => ({
          history: [
            {
              ...entry,
              id: generateId(),
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 50), // Keep last 50 entries
        })),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),
      clearHistory: () => set({ history: [] }),

      // Templates state
      templates: [],
      addTemplate: (name, formData) =>
        set((state) => ({
          templates: [
            {
              id: generateId(),
              name,
              formData,
              createdAt: Date.now(),
            },
            ...state.templates,
          ],
        })),
      removeTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        })),

      // Favorites state
      favorites: [],
      addFavorite: (message, variant, communicationType) =>
        set((state) => ({
          favorites: [
            {
              id: generateId(),
              message,
              variant,
              communicationType,
              timestamp: Date.now(),
            },
            ...state.favorites,
          ],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
    }),
    {
      name: "procomm-storage",
      partialize: (state) => ({
        history: state.history,
        templates: state.templates,
        favorites: state.favorites,
      }),
    }
  )
);
