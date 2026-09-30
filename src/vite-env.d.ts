/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_AI_VISION_MODEL?: string;
  readonly VITE_OPENAQ_API_KEY?: string;
  readonly VITE_WAQI_API_KEY?: string;
  readonly VITE_OPENWEATHER_API_KEY?: string;
  readonly VITE_SENTINEL_HUB_CLIENT_ID?: string;
  readonly VITE_SENTINEL_HUB_CLIENT_SECRET?: string;
  readonly VITE_NASA_FIRMS_MAP_KEY?: string;
  readonly VITE_APP_MODE?: string;
  readonly VITE_ENABLE_FEDERATED_SIMULATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
