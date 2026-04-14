import { useState, useRef, useCallback, useMemo } from "react";

/* ═══════════ CONFIG ═══════════ */
const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || "";
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || "";
const IS_DEMO = !VAPI_PUBLIC_KEY || !VAPI_ASSISTANT_ID;

/* ═══════════ CSS ═══════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  @keyframes twinkle { 0% { opacity: 0.15; transform: scale(0.7); } 100% { opacity: 0.55; transform: scale(1.3); } }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes wag { 0% { transform: rotate(-12deg); } 100% { transform: rotate(12deg); } }
  @keyframes floatSoft { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(3deg); } }
  @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(255,107,138,0.5); } 70% { box-shadow: 0 0 0 24px rgba(255,107,138,0); } 100% { box-shadow: 0 0 0 0 rgba(255,107,138,0); } }
  @keyframes popIn { 0% { opacity:0; transform: scale(0.7) translateY(16px); } 100% { opacity:1; transform: scale(1) translateY(0); } }
  @keyframes fadeDown { 0% { opacity:0; transform: translateY(-24px); } 100% { opacity:1; transform: translateY(0); } }
  @keyframes dotBounce { 0%,80%,100% { opacity:0.25; transform: scale(0.7); } 40% { opacity:1; transform: scale(1.3); } }
  @keyframes soundBar { 0% { height: 5px; } 100% { height: 36px; } }
  @keyframes gentleFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
  html { font-size: 16px; }
  @media (max-width: 374px) { html { font-size: 14px; } }
  @media (min-width: 768px) { html { font-size: 18px; } }
  @media (min-width: 1024px) { html { font-size: 20px; } }
`;

/* ═══════════ FRENCH POODLE LUNITA ═══════════ */
const LunitaPoodle = ({ size = 140, animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{
    animation: animate ? "bounce 2.2s ease-in-out infinite" : "none",
    filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.3))",
  }}>
    <circle cx="156" cy="72" r="13" fill="#FFF5E9" stroke="#EDD8BE" strokeWidth="1" style={{ animation: animate ? "wag 0.45s ease-in-out infinite alternate" : "none", transformOrigin: "142px 88px" }} />
    <ellipse cx="100" cy="120" rx="40" ry="32" fill="#FFF8F0" />
    <circle cx="70" cy="108" r="17" fill="#FFF5E9" />
    <circle cx="130" cy="108" r="17" fill="#FFF5E9" />
    <circle cx="84" cy="135" r="14" fill="#FFF5E9" />
    <circle cx="116" cy="135" r="14" fill="#FFF5E9" />
    <circle cx="100" cy="97" r="15" fill="#FFF5E9" />
    <rect x="76" y="146" width="7" height="26" rx="3.5" fill="#FFF8F0" />
    <rect x="117" y="146" width="7" height="26" rx="3.5" fill="#FFF8F0" />
    <circle cx="79.5" cy="171" r="8.5" fill="#FFF5E9" />
    <circle cx="120.5" cy="171" r="8.5" fill="#FFF5E9" />
    <rect x="91" y="80" width="18" height="22" rx="7" fill="#FFF8F0" />
    <circle cx="100" cy="57" r="28" fill="#FFF5E9" />
    <circle cx="80" cy="45" r="13" fill="#FFF8F0" />
    <circle cx="120" cy="45" r="13" fill="#FFF8F0" />
    <circle cx="100" cy="34" r="14" fill="#FFF8F0" />
    <circle cx="89" cy="37" r="11" fill="#FFF8F0" />
    <circle cx="111" cy="37" r="11" fill="#FFF8F0" />
    <ellipse cx="70" cy="60" rx="13" ry="20" fill="#F5E4D0" transform="rotate(-10 70 60)" />
    <ellipse cx="130" cy="60" rx="13" ry="20" fill="#F5E4D0" transform="rotate(10 130 60)" />
    <circle cx="68" cy="73" r="7.5" fill="#F5E4D0" />
    <circle cx="132" cy="73" r="7.5" fill="#F5E4D0" />
    <ellipse cx="100" cy="62" rx="20" ry="16" fill="#FFF8F0" />
    <circle cx="91" cy="56" r="5" fill="#2D1810" />
    <circle cx="109" cy="56" r="5" fill="#2D1810" />
    <circle cx="93" cy="54.5" r="1.8" fill="white" />
    <circle cx="111" cy="54.5" r="1.8" fill="white" />
    <ellipse cx="100" cy="65" rx="5" ry="4" fill="#2D1810" />
    <ellipse cx="99" cy="63.5" rx="1.8" ry="1" fill="#5A3A2A" opacity="0.4" />
    <path d="M95 69 Q100 74 105 69" stroke="#2D1810" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <ellipse cx="100" cy="72.5" rx="3.5" ry="4.5" fill="#FFB0B0" />
    <ellipse cx="83" cy="63" rx="4.5" ry="2.8" fill="#FFCECE" opacity="0.45" />
    <ellipse cx="117" cy="63" rx="4.5" ry="2.8" fill="#FFCECE" opacity="0.45" />
    <path d="M83 82 Q100 89 117 82" stroke="#FF6B8A" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="100" cy="87" r="4.5" fill="#FFD700" stroke="#DAA520" strokeWidth="0.8" />
    <text x="100" y="89.5" textAnchor="middle" fontSize="5.5" fill="#996515" fontWeight="bold">L</text>
    {animate && <>
      <text x="148" y="38" fontSize="13" style={{ animation: "twinkle 1.5s ease-in-out infinite" }}>✨</text>
      <text x="50" y="32" fontSize="9" style={{ animation: "twinkle 2s 0.6s ease-in-out infinite" }}>⭐</text>
      <text x="155" y="105" fontSize="8" style={{ animation: "twinkle 1.8s 1s ease-in-out infinite" }}>💫</text>
    </>}
  </svg>
);

/* ═══════════ BACKGROUND ═══════════ */
const StarField = () => {
  const stars = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i, emoji: ["⭐","🌙","✨","💫","🌟"][i % 5],
    left: Math.random()*100, top: Math.random()*100,
    size: Math.random()*8+10, delay: Math.random()*5, dur: Math.random()*3+4,
  })), []);
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {stars.map(s => (
        <span key={s.id} style={{
          position:"absolute", left:`${s.left}%`, top:`${s.top}%`, fontSize:s.size,
          animation:`floatSoft ${s.dur}s ${s.delay}s ease-in-out infinite`, opacity:0.3,
        }}>{s.emoji}</span>
      ))}
    </div>
  );
};

/* ═══════════ SOUND WAVES ═══════════ */
const SoundWaves = ({ active }) => {
  if (!active) return null;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:4, height:50, justifyContent:"center", padding:"10px 0" }}>
      {Array.from({ length: 14 }, (_, i) => (
        <div key={i} style={{
          width: 5, borderRadius: 5,
          background: "linear-gradient(to top, #82D9FF, #FF8EC7)",
          animation: `soundBar 0.65s ${i*0.055}s ease-in-out infinite alternate`, opacity: 0.75,
        }} />
      ))}
    </div>
  );
};

/* ═══════════ STORY CARD ═══════════ */
const StoryCard = ({ emoji, label, color, onClick, delay }) => {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} style={{
      background: `linear-gradient(155deg, ${color}15, ${color}30)`,
      border: `2.5px solid ${hover ? color + "99" : color + "44"}`,
      borderRadius: "1.5rem", padding: "1.2rem 0.5rem 1rem",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 6, cursor: "pointer",
      transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
      animation: `popIn 0.5s ${delay}s both cubic-bezier(.34,1.56,.64,1)`,
      width: "100%", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      fontFamily: "'Fredoka', cursive",
      transform: hover ? "scale(1.08) translateY(-4px)" : "scale(1)",
      boxShadow: hover ? `0 12px 28px ${color}35` : "none",
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setTimeout(() => setHover(false), 150)}
    >
      <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>{emoji}</span>
      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffffffcc", letterSpacing: 0.3 }}>{label}</span>
    </button>
  );
};

/* ═══════════ MAIN APP ═══════════ */
export default function App() {
  const [screen, setScreen] = useState("home");
  const [customText, setCustomText] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState("");
  const vapiRef = useRef(null);

  const categories = useMemo(() => [
    { emoji: "🐩", label: "Luna", color: "#FF6B8A", prompt: "Cuéntame un cuento donde Luna, mi poodle francesa, sea el personaje principal. Luna es juguetona, esponjosa, blanca y muy dulce." },
    { emoji: "🚀", label: "Espacio", color: "#7C6BFF", prompt: "Cuéntame una aventura en el espacio exterior con planetas, estrellas y alienígenas amigables." },
    { emoji: "🧚", label: "Hadas", color: "#FF7EB3", prompt: "Cuéntame un cuento de hadas con magia y un bosque encantado." },
    { emoji: "🦕", label: "Dinos", color: "#56C596", prompt: "Cuéntame un cuento con dinosaurios amigables y chistosos." },
    { emoji: "🧜‍♀️", label: "Sirenas", color: "#00C9DB", prompt: "Cuéntame un cuento del océano con sirenas y peces de colores." },
    { emoji: "🏰", label: "Castillo", color: "#FFB347", prompt: "Cuéntame un cuento sobre un castillo mágico con dragones amigables." },
  ], []);

  /* ── VAPI INTEGRATION (PRODUCTION) ── */
  const startCall = useCallback(async (storyPrompt) => {
    setScreen("calling");
    setTranscript("");
    setError("");

    // If no keys configured, show error
    if (IS_DEMO) {
      setError("No se encontraron las claves de VAPI. Agrégalas a tu archivo .env y reinicia la app.");
      setTimeout(() => setScreen("home"), 4000);
      return;
    }

    try {
      const Vapi = (await import("@vapi-ai/web")).default;
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);

      vapiRef.current.on("call-start", () => {
        setIsConnected(true);
        setScreen("talking");
      });

      vapiRef.current.on("message", (msg) => {
        if (msg.type === "transcript" && msg.role === "assistant") {
          setTranscript(msg.transcript);
        }
      });

      vapiRef.current.on("call-end", () => {
        setIsConnected(false);
        setScreen("home");
      });

      vapiRef.current.on("error", (err) => {
        console.error("VAPI error:", err);
        setError("¡Ups! Algo salió mal. ¡Inténtalo de nuevo!");
        setTimeout(() => setScreen("home"), 3000);
      });

      await vapiRef.current.start(VAPI_ASSISTANT_ID, {
        firstMessage: storyPrompt,
      });

    } catch (err) {
      console.error("VAPI Error:", err);
      setError("No se pudo conectar con Alex. ¡Revisa tu internet e inténtalo de nuevo!");
      setTimeout(() => setScreen("home"), 3000);
    }
  }, []);

  const endCall = useCallback(() => {
    if (vapiRef.current) {
      try { vapiRef.current.stop(); } catch (e) { /* ignore */ }
    }
    setIsConnected(false);
    setScreen("home");
    setCustomText("");
    setShowCustom(false);
  }, []);

  /* ── Shared styles ── */
  const page = {
    minHeight: "100vh",
    background: "linear-gradient(165deg, #0B0A1F 0%, #151537 35%, #1C1B4B 65%, #120B2E 100%)",
    fontFamily: "'Fredoka', 'Quicksand', sans-serif",
    position: "relative", overflow: "hidden",
  };

  const safe = {
    position: "relative", zIndex: 1,
    maxWidth: 480, margin: "0 auto",
    padding: "clamp(1.2rem, 4vw, 2.5rem) clamp(1.2rem, 5vw, 2rem)",
    display: "flex", flexDirection: "column", gap: "clamp(1rem, 3vw, 1.6rem)",
    minHeight: "100vh",
  };

  const titleStyle = (size = "clamp(1.6rem, 6vw, 2.2rem)") => ({
    fontSize: size, fontWeight: 700, lineHeight: 1.15,
    background: "linear-gradient(135deg, #FFE066, #FF8EC7, #82D9FF)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    fontFamily: "'Fredoka', cursive",
  });

  const subtitleStyle = { color: "#ffffffaa", fontSize: "clamp(0.85rem, 3vw, 1rem)", fontWeight: 500 };

  const getLunitaSize = () => Math.min(160, (typeof window !== "undefined" ? window.innerWidth : 400) * 0.35);

  /* ════════ HOME ════════ */
  if (screen === "home") {
    return (
      <div style={page}>
        <StarField />
        <style>{CSS}</style>
        <div style={safe}>
          <div style={{ textAlign: "center", animation: "fadeDown 0.8s both" }}>
            <LunitaPoodle size={getLunitaSize()} animate />
            <h1 style={{ ...titleStyle(), margin: "0.5rem 0 0" }}>Cuentos con Alex</h1>
            <p style={{ ...subtitleStyle, margin: "0.35rem 0 0" }}>
              ¡Elige una aventura mágica o crea la tuya! ✨
            </p>
            {IS_DEMO && (
              <p style={{ fontSize: "0.65rem", color: "#FF6B8A", marginTop: "0.4rem", padding: "0.3rem 0.8rem", background: "rgba(255,107,138,0.1)", borderRadius: "0.6rem", display: "inline-block" }}>
                ⚠️ Agrega las claves de VAPI al archivo .env para activar la voz
              </p>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(0.6rem, 2.5vw, 1rem)" }}>
            {categories.map((cat, i) => (
              <StoryCard key={cat.label} emoji={cat.emoji} label={cat.label}
                color={cat.color} delay={0.12 + i * 0.07} onClick={() => startCall(cat.prompt)} />
            ))}
          </div>

          {!showCustom ? (
            <button onClick={() => setShowCustom(true)} style={{
              display: "flex", alignItems: "center", gap: "0.8rem",
              background: "linear-gradient(145deg, rgba(255,224,102,0.08), rgba(255,107,138,0.12))",
              border: "2px dashed #FFE06655", borderRadius: "1.4rem",
              padding: "clamp(0.9rem, 3vw, 1.2rem) clamp(1rem, 4vw, 1.4rem)",
              cursor: "pointer", transition: "all 0.3s ease",
              width: "100%", fontFamily: "'Fredoka', cursive",
              animation: "popIn 0.5s 0.65s both cubic-bezier(.34,1.56,.64,1)",
            }}>
              <span style={{ fontSize: "2rem" }}>🎨</span>
              <div style={{ textAlign: "left", flex: 1 }}>
                <div style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)", fontWeight: 700, color: "#FFE066" }}>¡Crea tu propio cuento!</div>
                <div style={{ fontSize: "clamp(0.7rem, 2.5vw, 0.8rem)", color: "#ffffff66", fontWeight: 500, marginTop: 2 }}>Pide cualquier historia que puedas imaginar</div>
              </div>
              <span style={{ fontSize: "1.2rem", color: "#ffffff44" }}>→</span>
            </button>
          ) : (
            <div style={{
              background: "rgba(255,255,255,0.05)", borderRadius: "1.4rem",
              padding: "clamp(1rem, 4vw, 1.5rem)",
              border: "1.5px solid rgba(255,255,255,0.08)", animation: "popIn 0.35s both",
            }}>
              <p style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "#FFE066", fontWeight: 700, marginBottom: "0.8rem" }}>
                ¿Qué cuento te gustaría? 🌟
              </p>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <input type="text" value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="ej. Luna viaja a la luna..."
                  autoFocus
                  onKeyDown={e => { if (e.key === "Enter" && customText.trim()) startCall(customText); }}
                  style={{
                    flex: 1, padding: "clamp(0.7rem, 2.5vw, 0.85rem) clamp(0.8rem, 3vw, 1rem)",
                    borderRadius: "1rem", border: "2px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", color: "white",
                    fontSize: "clamp(0.8rem, 3vw, 0.9rem)", fontFamily: "'Fredoka', cursive", outline: "none",
                  }} />
                <button onClick={() => { if (customText.trim()) startCall(customText); }}
                  disabled={!customText.trim()}
                  style={{
                    width: 52, height: 52, borderRadius: "1rem", border: "none",
                    background: customText.trim() ? "linear-gradient(145deg, #FF6B8A, #FF3366)" : "rgba(255,255,255,0.08)",
                    fontSize: "1.3rem", cursor: customText.trim() ? "pointer" : "default",
                    transition: "all 0.25s ease", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>🚀</button>
              </div>
              <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                {["Luna en el espacio 🚀", "Luna y el dragón 🐉", "Luna en la nieve ❄️", "Luna encuentra un tesoro 💎"].map(s => (
                  <button key={s} onClick={() => setCustomText(s)} style={{
                    padding: "0.35rem 0.75rem", borderRadius: "1.2rem",
                    border: `1.5px solid ${customText === s ? "#FFE06677" : "rgba(255,255,255,0.1)"}`,
                    background: customText === s ? "rgba(255,224,102,0.12)" : "rgba(255,255,255,0.04)",
                    color: customText === s ? "#FFE066" : "#ffffffaa",
                    fontSize: "clamp(0.65rem, 2.4vw, 0.78rem)", cursor: "pointer",
                    fontFamily: "'Fredoka', cursive", transition: "all 0.2s ease", whiteSpace: "nowrap",
                  }}>{s}</button>
                ))}
              </div>
              <button onClick={() => { setShowCustom(false); setCustomText(""); }}
                style={{ background: "none", border: "none", color: "#ffffff55", fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)", cursor: "pointer", fontFamily: "'Fredoka', cursive", marginTop: "0.7rem", padding: "0.3rem 0" }}>
                ← Volver
              </button>
            </div>
          )}

          <p style={{ fontSize: "clamp(0.6rem, 2vw, 0.7rem)", color: "#ffffff33", textAlign: "center", marginTop: "auto", paddingTop: "0.8rem" }}>
            Hecho con amor para pequeños soñadores 💜
          </p>
        </div>
      </div>
    );
  }

  /* ════════ CALLING ════════ */
  if (screen === "calling") {
    return (
      <div style={page}>
        <StarField />
        <style>{CSS}</style>
        <div style={{ ...safe, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ animation: "gentleFloat 2s ease-in-out infinite" }}>
            <LunitaPoodle size={Math.min(130, (typeof window !== "undefined" ? window.innerWidth : 400) * 0.3)} animate />
          </div>
          <div style={{ fontSize: "1.6rem", color: "#82D9FF", display: "flex", gap: 10, justifyContent: "center", margin: "0.6rem 0" }}>
            <span style={{ animation: "dotBounce 1.4s 0s infinite" }}>●</span>
            <span style={{ animation: "dotBounce 1.4s 0.2s infinite" }}>●</span>
            <span style={{ animation: "dotBounce 1.4s 0.4s infinite" }}>●</span>
          </div>
          <h2 style={titleStyle("clamp(1.3rem, 5vw, 1.7rem)")}>Llamando a Alex...</h2>
          <p style={subtitleStyle}>Preparando tu cuento mágico ✨</p>
          {error && (
            <p style={{ color: "#FF6B8A", fontSize: "0.85rem", background: "rgba(255,107,138,0.1)", padding: "0.5rem 1rem", borderRadius: "0.8rem", marginTop: "0.5rem" }}>{error}</p>
          )}
          <button onClick={endCall} style={{
            marginTop: "1.5rem", background: "none", border: "1.5px solid #ffffff33",
            borderRadius: "1rem", padding: "0.5rem 1.5rem", color: "#ffffff66",
            fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)", cursor: "pointer", fontFamily: "'Fredoka', cursive",
          }}>Cancelar</button>
        </div>
      </div>
    );
  }

  /* ════════ TALKING ════════ */
  if (screen === "talking") {
    return (
      <div style={page}>
        <StarField />
        <style>{CSS}</style>
        <div style={{ ...safe, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ position: "relative", marginBottom: "0.4rem" }}>
            <LunitaPoodle size={Math.min(120, (typeof window !== "undefined" ? window.innerWidth : 400) * 0.28)} animate />
            <div style={{
              position: "absolute", top: -4, right: -4, background: "#4ADE80",
              borderRadius: "50%", width: 18, height: 18, border: "3px solid #151537",
              animation: "pulseRing 2s infinite",
            }} />
          </div>
          <h2 style={titleStyle("clamp(1.1rem, 4.5vw, 1.4rem)")}>Alex te está contando un cuento... 📖</h2>
          <SoundWaves active={isConnected} />
          {transcript && (
            <div style={{
              background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "1.4rem", padding: "clamp(1rem, 3.5vw, 1.3rem) clamp(1.1rem, 4vw, 1.5rem)",
              color: "#ffffffdd", fontSize: "clamp(0.88rem, 3vw, 1rem)",
              lineHeight: 1.65, maxHeight: 220, overflowY: "auto",
              width: "100%", textAlign: "left", animation: "popIn 0.4s both",
            }}>
              <p style={{ margin: 0 }}>{transcript}</p>
            </div>
          )}
          <button onClick={endCall} style={{
            width: "clamp(70px, 18vw, 88px)", height: "clamp(70px, 18vw, 88px)",
            borderRadius: "50%", border: "none",
            background: "linear-gradient(145deg, #FF6B8A, #FF3366)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            animation: "pulseRing 1.8s ease-out infinite", marginTop: "0.6rem",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>
          <p style={{ color: "#FF8EC7", fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)", fontWeight: 600, margin: "0.3rem 0 0" }}>
            Toca para terminar el cuento
          </p>
          <button onClick={endCall} style={{
            background: "none", border: "none", color: "#ffffff44",
            fontSize: "clamp(0.7rem, 2.3vw, 0.8rem)", cursor: "pointer",
            fontFamily: "'Fredoka', cursive", marginTop: "0.8rem", padding: "0.3rem",
          }}>← Volver al inicio</button>
        </div>
      </div>
    );
  }

  return null;
}
