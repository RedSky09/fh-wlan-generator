"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { ClipboardCopy, ClipboardCheck, RefreshCw } from "lucide-react";

export default function Home() {
  const [ssid, setSsid] = useState("");
  const [passkey, setPasskey] = useState("");
  const [copied, setCopied] = useState(false);

  const genPasskey = (ssid) => {
    const pairs = [
      ["a", "5"],
      ["b", "4"],
      ["c", "3"],
      ["d", "2"],
      ["e", "1"],
      ["f", "0"],
      ["6", "9"],
      ["7", "8"],
    ];
    const mapping = {};
    pairs.forEach(([k, v]) => {
      mapping[k] = v;
      mapping[v] = k;
    });

    ssid = ssid.trim();
    if (!ssid.startsWith("fh_")) return "";
    const parts = ssid.split("_");
    if (parts.length < 2) return "";
    const middle = parts[1];
    const transformed = [...middle]
      .map((c) => mapping[c.toLowerCase()] || c)
      .join("");
    return "wlan" + transformed;
  };

  const handleGenerate = () => {
    const result = genPasskey(ssid);
    setPasskey(result || "Invalid input");
  };

  const handleCopy = () => {
    if (passkey && passkey !== "Invalid input") {
      navigator.clipboard.writeText(passkey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>FH WLAN Generator</h1>
        <input
          type="text"
          placeholder="Enter SSID (e.g. fh_ab12cd_5G)"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className={styles.input}
          style={{ background: "white", color: "black" }}
        />
        <button onClick={handleGenerate} className={styles.button}>
          <RefreshCw size={16} style={{ marginRight: "6px" }} /> Generate
          Passkey
        </button>

        {passkey && (
          <div className={styles.result}>
            <strong style={{ display: "block", marginBottom: "10px" }}>
              {passkey}
            </strong>
            {passkey !== "Invalid input" && (
              <button onClick={handleCopy} className={styles.copy}>
                {copied ? (
                  <ClipboardCheck size={16} />
                ) : (
                  <ClipboardCopy size={16} />
                )}
                &nbsp;{copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
        )}

        <footer className={styles.footer}>Nvermind</footer>
      </div>
    </div>
  );
}
