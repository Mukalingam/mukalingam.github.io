import type { Metadata } from "next";
import AskAgent from "@/components/AskAgent";

export const metadata: Metadata = {
  title: "Ask Muka's Agent",
  description:
    "Ask an AI agent about Muka Lingam's production AI work — grounded in his verified resume and case studies. It refuses to hallucinate, like everything he ships.",
  alternates: { canonical: "/ask/" },
};

export default function AskPage() {
  return (
    <main className="ask-page wrap">
      <h1>Ask Muka&apos;s Agent</h1>
      <p className="ask-sub">
        Recruiter? Founder? Curious? Ask about what I&apos;ve shipped, how iVaak works, or whether I&apos;m open to your role.
      </p>
      <p className="ask-note">
        <b>Grounded, eval-tested, and refuses to hallucinate</b> — like everything I ship. Answers come only
        from my verified resume and case studies; anything else gets an honest &quot;I don&apos;t know.&quot;
      </p>
      <AskAgent />
    </main>
  );
}
