/**
 * BRIIZZ Villain Voice Engine
 * Deep, raw, intimidating, gravelly character voice
 * Using Web Speech API with maximum depth + procedural audio post-processing
 */

import { audioEngine } from './audio-engine';

export interface VoiceOptions {
  pitch?: number;
  rate?: number;
  pauseBefore?: number;
  pauseAfter?: number;
}

class VillainVoice {
  private isMuted: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined') return;
    this.voices = window.speechSynthesis.getVoices();

    // Priority order: deepest available English male voice
    // These tend to be the deepest voices across platforms
    const deepMalePreference = [
      'Microsoft Guy Online (Natural)',
      'Microsoft Ryan Online (Natural)',
      'Google UK English Male',
      'Microsoft David Desktop',
      'Alex',              // macOS deep voice
      'Daniel',            // UK English, deeper
      'Arthur',
      'Reed',
      'Eddy',
      'Rocko',
    ];

    for (const name of deepMalePreference) {
      const found = this.voices.find(v =>
        v.name.toLowerCase().includes(name.toLowerCase())
      );
      if (found) {
        this.selectedVoice = found;
        break;
      }
    }

    // Fallback: any English male-sounding voice
    if (!this.selectedVoice) {
      this.selectedVoice =
        this.voices.find(v => /en/i.test(v.lang) && /male|guy|david|ryan|george|james|arthur|daniel|reed/i.test(v.name)) ||
        this.voices.find(v => /en-gb|en-us/i.test(v.lang)) ||
        this.voices.find(v => /en/i.test(v.lang)) ||
        this.voices[0] ||
        null;
    }

    this.initialized = true;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Speaks a line in the villain character voice.
   * pitch: 0.1–2 (0.1 = deepest possible)
   * rate:  0.1–10 (0.65–0.80 = slow, powerful delivery)
   */
  public speak(
    text: string,
    options: VoiceOptions = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const {
        pitch = 0.01,  // Kratos maximum depth
        rate = 0.55,   // Kratos slow, deliberate pacing
        pauseBefore = 0,
        pauseAfter = 0,
      } = options;

      // Timing fallback when speech is muted or unavailable
      if (
        this.isMuted ||
        typeof window === 'undefined' ||
        !('speechSynthesis' in window)
      ) {
        const wordCount = text.split(' ').length;
        const estimatedMs = pauseBefore + wordCount * 650 + pauseAfter;
        setTimeout(resolve, estimatedMs);
        return;
      }

      const execute = () => {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        if (this.selectedVoice) utterance.voice = this.selectedVoice;

        // God of War voice settings
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = 1.0;

        utterance.onend = () => {
          if (pauseAfter > 0) {
            setTimeout(resolve, pauseAfter);
          } else {
            resolve();
          }
        };

        utterance.onerror = () => resolve();

        window.speechSynthesis.speak(utterance);
      };

      if (pauseBefore > 0) {
        setTimeout(execute, pauseBefore);
      } else {
        execute();
      }
    });
  }

  /**
   * Silence gap — a beat / dramatic pause between lines
   */
  public pause(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const villainVoice = new VillainVoice();
