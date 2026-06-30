'use client';
import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   GEMINI AI CHAT WIDGET
   Hiển thị nút chat nổi + cửa sổ chat AI
───────────────────────────────────────────── */
function GeminiChatWidget({ managerUrl, siteName }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn? 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch(`${managerUrl}/plugins/gemini-assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, site: siteName })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'ai',
        text: data.reply || data.error || 'Xin lỗi, tôi không thể trả lời lúc này.'
      }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Lỗi kết nối. Vui lòng thử lại.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '88px', right: '20px',
          width: '340px', maxHeight: '480px',
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9998, overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '14px 16px', display: 'flex',
            alignItems: 'center', gap: '10px'
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px'
            }}>🤖</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>Trợ lý AI Gemini</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>Powered by Google Gemini Flash</div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.2)',
              border: 'none', borderRadius: '50%', width: 28, height: 28,
              cursor: 'pointer', color: '#fff', fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '8px',
            maxHeight: '320px', background: '#f8fffe'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '78%', padding: '8px 12px',
                  borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  background: m.role === 'user' ? '#10b981' : '#fff',
                  color: m.role === 'user' ? '#fff' : '#1a1a1a',
                  fontSize: '13px', lineHeight: '1.4',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '4px', padding: '8px 12px' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: '#10b981', opacity: 0.6,
                    animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`
                  }}/>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{
            padding: '10px 12px', borderTop: '1px solid #e5e7eb',
            display: 'flex', gap: '8px', background: '#fff'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              style={{
                flex: 1, padding: '8px 12px', border: '1px solid #d1fae5',
                borderRadius: '20px', fontSize: '13px', outline: 'none',
                background: '#f8fffe'
              }}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{
              width: 36, height: 36, borderRadius: '50%',
              background: input.trim() ? '#10b981' : '#d1d5db',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              color: '#fff', fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s', flexShrink: 0
            }}>➤</button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', bottom: '20px', right: '20px',
        width: 56, height: 56, borderRadius: '50%',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', zIndex: 9999,
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
        onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.boxShadow = '0 6px 28px rgba(16,185,129,0.5)'; }}
        onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 20px rgba(16,185,129,0.4)'; }}
        title="Chat với AI"
      >
        {open ? '✕' : '🤖'}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   GOOGLE ANALYTICS 4 WIDGET
   Tự inject GA4 script khi plugin được cài
───────────────────────────────────────────── */
function GoogleAnalyticsWidget({ pluginConfig }) {
  useEffect(() => {
    const measurementId = pluginConfig?.MEASUREMENT_ID;
    if (!measurementId || typeof window === 'undefined') return;
    if (document.getElementById('ga4-script')) return;

    const script1 = document.createElement('script');
    script1.id = 'ga4-script';
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);
  }, [pluginConfig]);

  return null; // Không render gì cả, chỉ inject script
}

/* ─────────────────────────────────────────────
   MAIN PLUGIN RUNNER
   Fetch installed plugins và render từng widget
───────────────────────────────────────────── */
export default function PluginRunner() {
  const [plugins, setPlugins] = useState([]);
  const [meta, setMeta] = useState({ managerUrl: '', siteName: '' });

  useEffect(() => {
    fetch('/api/plugins')
      .then(r => r.json())
      .then(data => {
        setPlugins(data.installed || []);
        setMeta({ managerUrl: data.managerUrl || '', siteName: data.siteName || '' });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {plugins.map(plugin => {
        switch (plugin.id) {
          case 'gemini-assistant':
            return (
              <GeminiChatWidget
                key={plugin.id}
                managerUrl={meta.managerUrl}
                siteName={meta.siteName}
              />
            );
          case 'analytics-google':
            return (
              <GoogleAnalyticsWidget
                key={plugin.id}
                pluginConfig={plugin.config}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
