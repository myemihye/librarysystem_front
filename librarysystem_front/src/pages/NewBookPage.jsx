import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewBookPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    textarea: {
      padding: "10px",
      height: "120px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      resize: "none",
    },
    imageBox: {
      width: "100%",
      height: "200px",
      border: "1px dashed #aaa",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666",
      backgroundColor: "#fafafa",
    },
    buttonWrap: {
      display: "flex",
      gap: "10px",
    },
    buttonPrimary: {
      flex: 1,
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
    buttonSecondary: {
      flex: 1,
      padding: "12px",
      backgroundColor: "#555",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
    buttonBack: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#ddd",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>📘 새로운 도서 추가</h2>

      <input
        type="text"
        placeholder="책 제목"
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="저자"
        style={styles.input}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        placeholder="책 요약을 입력하세요..."
        style={styles.textarea}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <div style={styles.imageBox}>AI 생성 이미지 미리보기</div>

      <div style={styles.buttonWrap}>
        <button style={styles.buttonSecondary}>AI 이미지 생성</button>
        <button style={styles.buttonPrimary}>도서 등록</button>
      </div>

      <button style={styles.buttonBack} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}

// export default function NewBookPage() {
//   return <h2> NewBookPage</h2>;
// }

