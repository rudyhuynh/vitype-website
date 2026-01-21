import { useEffect, useRef, useState } from "react";

const phrases = [
  "Xin chào Việt Nam! 🇻🇳",
  "Gõ tiếng Việt thật dễ dàng",
  "Telex: Vieejt Nam",
  "VNI: Vie65t Nam",
  "ViType - Mã nguồn mở ❤️",
  "Không lo gõ nhầm khi code",
];

export default function TypingDemo() {
  const [displayText, setDisplayText] = useState("");
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndexRef.current];

      if (isPausedRef.current) {
        isPausedRef.current = false;
        isDeletingRef.current = true;
        return 1500;
      }

      if (isDeletingRef.current) {
        charIndexRef.current--;
        setDisplayText(currentPhrase.substring(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          phraseIndexRef.current =
            (phraseIndexRef.current + 1) % phrases.length;
        }
        return 30;
      } else {
        charIndexRef.current++;
        setDisplayText(currentPhrase.substring(0, charIndexRef.current));

        if (charIndexRef.current === currentPhrase.length) {
          isPausedRef.current = true;
        }
        return 80;
      }
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const delay = typeEffect();
      timeoutId = setTimeout(tick, delay);
    };

    // Start after initial delay
    timeoutId = setTimeout(tick, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="keyboard-demo">
      <div className="keyboard-window">
        <div className="window-header">
          <span className="window-dot red"></span>
          <span className="window-dot yellow"></span>
          <span className="window-dot green"></span>
        </div>
        <div className="typing-demo">
          <span className="typing-text">{displayText}</span>
          <span className="cursor">|</span>
        </div>
      </div>
    </div>
  );
}
