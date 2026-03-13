import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Scientist</h4>
                <h5>Innodatatics Inc.</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Achieved a 30% reduction in downtime for production equipment by
              developing predictive maintenance models using Python and
              scikit-learn. Delivered actionable AI insights driving significant
              operational improvements and cost savings.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Data Scientist</h4>
                <h5>Spotflock Technologies</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Built Transformers-based ocean current prediction model for INCOIS
              achieving 85% accuracy — officially recognized by INCOIS/MOES.
              Developed Automated Gauge Monitoring System for Sembcorp using
              Computer Vision, saving 900+ labor hours and generating US$1M+.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead AI Engineer</h4>
                <h5>The Audience Street Inc.</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built Ninadata — an AI AdTech platform using LLMs and advanced NLP
              achieving 20% increase in targeted ad engagement and 25% ad
              relevance improvement. Developed intelligent model routing system
              selecting optimal AI models (DALL-E, GPT-4, Claude) automatically.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead AI Engineer</h4>
                <h5>LowCode Labs</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Architected enterprise AI agent ecosystems serving 500+ users with
              RAG pipelines, Voice AI (ElevenLabs), WhatsApp AI Agents, and
              MedGemma healthcare integration. Saved clients $15,000+ in cloud
              costs via Kubernetes optimization. Mentored junior engineers on MCP.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Solution Architect</h4>
                <h5>IICL</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architecting end-to-end AI-first solutions driving 20–30% business
              transformation. Leading strategic AI roadmaps, multi-agent system
              design, and semantic platform architecture — translating complex AI
              innovations into measurable enterprise value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
