"use client";

import styles from "./DownloadResume.module.css";

/* From Uiverse.io by Na3ar-17 — wired to the real resume PDF */
export default function DownloadResume() {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.input}
          onChange={(e) => {
            if (e.target.checked) {
              const a = document.createElement("a");
              a.href = "/resume.pdf";
              a.download = "Muka-Lingam-Resume.pdf";
              a.click();
            } else {
              window.open("/resume.pdf", "_blank");
            }
          }}
        />
        <span className={styles.circle}>
          <svg
            className={styles.icon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            ></path>
          </svg>
          <div className={styles.square}></div>
        </span>
        <p className={styles.title}>Download</p>
        <p className={styles.title}>Open</p>
      </label>
    </div>
  );
}
