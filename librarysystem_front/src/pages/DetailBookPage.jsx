import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailBookPage() {
  const navigate = useNavigate();
  const { book_id } = useParams();

  // dummy 데이터
  const dummyBook = {
    book_id,
    title: "예시 도서 제목",
    author: "홍길동",
    summary: "이 책은 UI 테스트를 위해 만든 예시 요약입니다.",
    imageUrl: "",
  };

  // 대출 상태
  const [status, setStatus] = useState("대출 가능");

  const handleBorrow = () => {
    setStatus("대출 중");
  };

  const handleReturn = () => {
    setStatus("대출 가능");
  };

  const styles = {
    container: {
      maxWidth: "700px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    imageBox: {
      width: "100%",
      height: "250px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f3f3",
      color: "#666",
    },
    fieldBox: {
      padding: "12px",
      backgroundColor: "white",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    label: { fontSize: "14px", fontWeight: "bold", marginBottom: "6px" },
    text: { fontSize: "16px" },
    buttonWrap: { display: "flex", gap: "10px" },
    editBtn: {
      flex: 1,
      padding: "12px",
      backgroundColor: "#6c757d",
      color: "white",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
    borrowBtn: {
      flex: 1,
      padding: "12px",
      backgroundColor: "#198754",
      color: "white",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
    returnBtn: {
      flex: 1,
      padding: "12px",
      backgroundColor: "#d63384",
      color: "white",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
    backBtn: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#ddd",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>📖 도서 상세 정보</h2>

      {/* 이미지 */}
      <div style={styles.imageBox}>
        {dummyBook.imageUrl ? (
          <img
            src={dummyBook.imageUrl}
            alt="AI 이미지"
            style={{ width: "100%", height: "100%", borderRadius: "6px" }}
          />
        ) : (
          "AI 생성 이미지 미리보기"
        )}
      </div>

      {/* 제목 */}
      <div style={styles.fieldBox}>
        <div style={styles.label}>책 제목</div>
        <div style={styles.text}>{dummyBook.title}</div>
      </div>

      {/* 저자 */}
      <div style={styles.fieldBox}>
        <div style={styles.label}>저자</div>
        <div style={styles.text}>{dummyBook.author}</div>
      </div>

      {/* 요약 */}
      <div style={styles.fieldBox}>
        <div style={styles.label}>책 요약</div>
        <div style={styles.text}>{dummyBook.summary}</div>
      </div>

      {/* 대출 상태 */}
      <div style={styles.fieldBox}>
        <div style={styles.label}>대출 상황</div>
        <div style={styles.text}>{status}</div>
      </div>

      {/* 버튼 */}
      <div style={styles.buttonWrap}>
        <button
          style={styles.editBtn}
          onClick={() => navigate(`/book/${book_id}/edit`)}
        >
          도서 수정
        </button>

        <button
          style={styles.borrowBtn}
          onClick={handleBorrow}
          disabled={status === "대출 중"}
        >
          대출
        </button>

        <button
          style={styles.returnBtn}
          onClick={handleReturn}
          disabled={status === "대출 가능"}
        >
          반납
        </button>
      </div>

      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}
