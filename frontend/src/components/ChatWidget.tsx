// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ImagePlus,
  Mic,
  Send,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { apiPost } from "@/utils/api";

const welcomeMessage = {
  role: "assistant",
  content: "Hi! How can I help you with SRO Bearings today?",
  products: [],
};

const PRODUCT_FALLBACK_IMAGE = "/srologo2.png";

const getProductHref = (product) => {
  if (product.url) return product.url;
  if (product.slug) return `/products/${product.slug}`;
  return "/products";
};

const ProductCards = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="mt-3 space-y-2">
      {products.map((product, index) => (
        <div
          key={`${product.slug || product.name}-${index}`}
          className="overflow-hidden rounded-md border border-slate-200 bg-slate-50"
        >
          <img
            src={product.image || PRODUCT_FALLBACK_IMAGE}
            alt={product.name}
            className="h-24 w-full bg-white object-contain p-2"
            onError={(event) => {
              event.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
            }}
          />
          <div className="p-2.5">
            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">
              {product.name}
            </h3>
            <a
              href={getProductHref(product)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#00974A] px-3 py-2 text-xs font-bold uppercase tracking-normal text-white transition hover:bg-[#007d3d]"
            >
              View Product
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const BlogCards = ({ blogs = [] }) => {
  if (!blogs.length) return null;

  return (
    <div className="mt-3 space-y-2">
      {blogs.map((blog, index) => (
        <a
          key={`${blog.slug || blog.title}-${index}`}
          href={blog.url || `/blogs/${blog.slug}`}
          className="block overflow-hidden rounded-md border border-emerald-100 bg-white transition hover:border-[#00974A] hover:shadow-sm"
        >
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="h-24 w-full bg-slate-50 object-cover"
            />
          )}
          <div className="p-2.5">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#00974A]">
              <span>{blog.category || "Blog"}</span>
              {blog.readTime && <span className="text-slate-400">{blog.readTime}</span>}
            </div>
            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">
              {blog.title}
            </h3>
            {blog.excerpt && (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                {blog.excerpt}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

const MarkdownMessage = ({ content, isUser }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      ul: ({ children }) => (
        <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
      ),
      li: ({ children }) => <li className="pl-1">{children}</li>,
      a: ({ children, href }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-2 ${
            isUser ? "text-white" : "text-[#00974A]"
          }`}
        >
          {children}
        </a>
      ),
      table: ({ children }) => (
        <div className="my-2 max-w-full overflow-x-auto rounded-md border border-slate-200">
          <table className="min-w-full border-collapse text-left text-xs">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className={isUser ? "bg-white/15" : "bg-slate-100"}>{children}</thead>
      ),
      th: ({ children }) => (
        <th className="border-b border-slate-200 px-2 py-1.5 font-bold">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="border-t border-slate-200 px-2 py-1.5 align-top">
          {children}
        </td>
      ),
      code: ({ children }) => (
        <code
          className={`rounded px-1 py-0.5 text-[0.85em] ${
            isUser ? "bg-white/15" : "bg-slate-100"
          }`}
        >
          {children}
        </code>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

const stripMarkdownForSpeech = (value = "") =>
  value
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_~>#|[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const looksHindiOrHinglish = (value = "") =>
  /[\u0900-\u097f]/.test(value) ||
  /\b(aap|apki|mujhe|mujeh|kya|hai|nahi|kr|kar|bta|bata|dekh|chahiye|bhej|team|details)\b/i.test(
    value
  );

const pickSpeechVoice = (text = "") => {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  const wantsHindi = looksHindiOrHinglish(text);

  if (wantsHindi) {
    return (
      voices.find((voice) => /hi[-_]?IN/i.test(voice.lang)) ||
      voices.find((voice) => /hindi|india/i.test(voice.name)) ||
      voices.find((voice) => /en[-_]?IN/i.test(voice.lang)) ||
      null
    );
  }

  return (
    voices.find((voice) => /en[-_]?US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    null
  );
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState(null);
  const listRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const previewUrlsRef = useRef([]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    setIsSpeechSupported(Boolean(SpeechRecognition));

    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    return () => {
      recognitionRef.current?.stop?.();
      window.speechSynthesis?.cancel?.();
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    previewUrlsRef.current.push(previewUrl);
    setSelectedImage(file);
    setImagePreview(previewUrl);
    setError("");
    event.target.value = "";
  };

  const removeSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      previewUrlsRef.current = previewUrlsRef.current.filter(
        (url) => url !== imagePreview
      );
    }
    setSelectedImage(null);
    setImagePreview("");
  };

  const toggleListening = () => {
    if (!isSpeechSupported || typeof window === "undefined") return;

    if (isListening) {
      recognitionRef.current?.stop?.();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();

      if (transcript) {
        setInput((current) =>
          current.trim() ? `${current.trim()} ${transcript}` : transcript
        );
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setError("Voice input is not available right now.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const toggleSpeech = (content, index) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (speakingMessageIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingMessageIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = stripMarkdownForSpeech(content);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = pickSpeechVoice(cleanText);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = looksHindiOrHinglish(cleanText) ? "hi-IN" : "en-US";
    }

    utterance.onend = () => setSpeakingMessageIndex(null);
    utterance.onerror = () => setSpeakingMessageIndex(null);
    setSpeakingMessageIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if ((!userMessage && !selectedImage) || isTyping) return;

    const sentImagePreview = imagePreview;

    const nextMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage || "Image attached",
        products: [],
        blogs: [],
        imageUrl: sentImagePreview,
      },
    ];
    setMessages(nextMessages);
    setInput("");
    setSelectedImage(null);
    setImagePreview("");
    setError("");
    setIsTyping(true);

    try {
      const history = messages
        .filter((message) => ["user", "assistant"].includes(message.role))
        .map((message) => ({
          role: message.role,
          content: message.content,
        }));

      const payload = selectedImage ? new FormData() : null;
      let data;

      if (payload) {
        payload.append("message", userMessage);
        payload.append("history", JSON.stringify(history));
        payload.append("image", selectedImage);
        data = await apiPost("/chat", payload, true);
      } else {
        data = await apiPost("/chat", {
          message: userMessage,
          history,
        });
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "I could not get an answer right now. I will connect you to a human support team member.",
          products: Array.isArray(data.products) ? data.products : [],
          blogs: Array.isArray(data.blogs) ? data.blogs : [],
        },
      ]);
    } catch (err) {
      setError(err.message || "Chat support is unavailable right now.");
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I am having trouble connecting right now. I will connect you to a human support team member.",
          products: [],
          blogs: [],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-3 z-[70] sm:bottom-6 sm:right-6 lg:bottom-10">
      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 flex h-[min(480px,calc(100svh-8rem))] max-h-[72svh] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-28 sm:h-[520px] sm:w-[380px] sm:max-h-[calc(100vh-9rem)] lg:bottom-32">
          <div className="flex shrink-0 items-center justify-between bg-slate-950 px-3 py-2.5 text-white sm:px-4 sm:py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00974A] sm:h-9 sm:w-9">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="text-sm font-bold">SRO AI Support</h2>
                <p className="text-[11px] text-white/70 sm:text-xs">Usually replies instantly</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3 sm:px-4 sm:py-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "bg-[#00974A] text-white"
                      : "border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {message.imageUrl && (
                    <img
                      src={message.imageUrl}
                      alt="Uploaded chat attachment"
                      className="mb-2 h-28 w-full rounded-md bg-white/20 object-cover"
                    />
                  )}
                  {message.role === "assistant" && (
                    <div className="mb-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => toggleSpeech(message.content, index)}
                        className={`grid h-7 w-7 place-items-center rounded-full transition ${
                          speakingMessageIndex === index
                            ? "bg-[#00974A] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                        aria-label={
                          speakingMessageIndex === index
                            ? "Stop reading message"
                            : "Read message aloud"
                        }
                      >
                        {speakingMessageIndex === index ? (
                          <VolumeX className="h-3.5 w-3.5" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                  <MarkdownMessage
                    content={message.content}
                    isUser={message.role === "user"}
                  />
                  {message.role === "assistant" && (
                    <>
                      <ProductCards products={message.products || []} />
                      <BlogCards blogs={message.blogs || []} />
                    </>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="shrink-0 border-t border-slate-200 bg-white p-2.5 sm:p-3">
            {imagePreview && (
              <div className="mb-2 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2">
                <img
                  src={imagePreview}
                  alt="Selected upload preview"
                  className="h-14 w-14 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-800">
                    {selectedImage?.name || "Selected image"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Add a message or send the image for team review.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="grid h-8 w-8 place-items-center rounded-md text-slate-500 transition hover:bg-white hover:text-red-600"
                  aria-label="Remove selected image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isTyping}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-300 text-slate-600 transition hover:border-[#00974A] hover:text-[#00974A] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Attach image"
              >
                <ImagePlus className="h-4 w-4" />
              </button>
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={isTyping}
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    isListening
                      ? "animate-pulse border-[#00974A] bg-[#00974A] text-white"
                      : "border-slate-300 text-slate-600 hover:border-[#00974A] hover:text-[#00974A]"
                  }`}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                >
                  <Mic className="h-4 w-4" />
                </button>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Type your message..."}
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#00974A] focus:ring-2 focus:ring-[#00974A]/20"
              />
              <button
                type="submit"
                disabled={isTyping || (!input.trim() && !selectedImage)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#00974A] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`relative ml-auto inline-flex items-center justify-center rounded-full bg-transparent transition hover:scale-110 ${
          isOpen ? "" : "animate-chat-jump"
        }`}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
      >
        {isOpen ? (
          <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-white shadow-xl sm:h-14 sm:w-14">
            <X className="h-6 w-6" />
          </span>
        ) : (
          <span className="inline-flex max-w-[150px] items-center justify-center rounded-full bg-[#00974A] px-4 py-3 text-center text-xs font-black uppercase leading-4 tracking-[0.08em] text-white shadow-2xl shadow-emerald-900/25 sm:max-w-[170px] sm:px-5 sm:py-3.5 sm:text-sm">
            Ask me anything!
          </span>
        )}
      </button>
    </div>
  );
}
