"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { socials } from "@/lib/data";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

/* ponytail: mailto form — no backend; swap for an API route + email service when needed */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const field =
    "w-full rounded-xl border border-white/10 bg-[#0a0a14]/70 px-5 py-3.5 text-white placeholder-gray-600 backdrop-blur-md outline-none transition focus:border-[#5b5bf0]/70";
  return (
    <form
      className="mt-14 max-w-2xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const subject = `Portfolio contact — ${form.name}`;
        const body = `${form.message}\n\n— ${form.name} (${form.email})`;
        window.location.href = `mailto:utlamuka@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={field}
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={field}
        />
      </div>
      <textarea
        required
        rows={5}
        placeholder="Tell me about your project — what needs to ship?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={`${field} resize-none`}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full bg-[#5b5bf0] px-10 py-3.5 font-semibold text-white shadow-[0_0_40px_-10px_#5b5bf0] transition hover:bg-[#6d6df5]"
      >
        Send message →
      </motion.button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col px-[6vw] pb-16 pt-32 text-white">
      <Scene3D minimal />
      <div className="flex flex-1 flex-col justify-center">
        <Reveal>
          <p className="font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
            GET IN TOUCH
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.05] tracking-tighter">
            Have an AI system
            <br />
            that needs to{" "}
            <span className="text-[#5b5bf0]">ship</span>?
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <motion.a
            href="mailto:utlamuka@gmail.com"
            whileHover={{ x: 12 }}
            className="mt-10 inline-block text-2xl text-gray-300 underline decoration-[#5b5bf0] underline-offset-8 hover:text-white sm:text-4xl"
          >
            utlamuka@gmail.com
          </motion.a>
        </Reveal>
        <Reveal delay={0.25}>
          <ContactForm />
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-16 grid max-w-2xl gap-6 sm:grid-cols-3">
            {socials
              .filter((s) => s.name !== "Email")
              .map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-white/10 bg-[#0a0a14]/70 p-5 backdrop-blur-md transition hover:border-[#5b5bf0]/70"
                >
                  <p className="font-mono text-xs text-gray-500">
                    {s.name === "GitHub"
                      ? "code"
                      : s.name === "LinkedIn"
                        ? "network"
                        : "writing"}
                  </p>
                  <p className="mt-1 font-semibold transition group-hover:text-[#8888f5]">
                    {s.name} ↗
                  </p>
                </a>
              ))}
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.4}>
        <p className="pt-10 font-mono text-xs text-gray-600">
          Hyderabad, India · Open to relocation (UAE · Qatar · Australia) · +91 96429 85468
        </p>
      </Reveal>
    </main>
  );
}
