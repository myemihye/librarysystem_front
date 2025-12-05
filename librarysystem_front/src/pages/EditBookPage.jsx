import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// useEffect 추가 예정
export default function EditBookPage() {
  const navigate = useNavigate();
  const { book_id } = useParams();

  // 🟦 더미 데이터 (UI 테스트용)
  // 실제 API 연동 시 useEffect 내부에서 fetch로 대체하면 됨.
  const dummyBook = {
    book_id,
    title: "예시 도서 제목",
    author: "홍길동",
    summary: "원래 저장된 책 요약입니다.",
    imageUrl: "",
  };

  // 🟦 수정용 상태값
  const [title, setTitle] = useState(dummyBook.title);
  const [author, setAuthor] = useState(dummyBook.author);
  const [summary, setSummary] = useState(dummyBook.summary);
  const [imageUrl, setImageUrl] = useState(dummyBook.imageUrl);
  const [isImageStale, setIsImageStale] = useState(false);
  // 요약이 바뀌었을 때 true → 이미지 재생성 필요

  // 요약 변경 감지 → 이미지 재생성 필요 표시
  //   useEffect(() => {
  //     if (summary !== dummyBook.summary) {
  //       setIsImageStale(true);
  //     } else {
  //       setIsImageStale(false);
  //     }
  //   }, [summary]);

  const handleSave = () => {
    console.log("수정된 데이터:", {
      title,
      author,
      summary,
      imageUrl,
    });

    // 실제 저장은 API 연동 예정
    navigate(`/book/${book_id}`);
  };

  const handleRegenerateImage = () => {
    alert("AI 이미지 재생성을 실행합니다 (테스트용).");

    // UI 테스트용 더미 이미지
    setImageUrl("https://via.placeholder.com/300x200.png?text=New+AI+Image");
    setIsImageStale(false);
  };

  const styles = {
    container: {
      maxWidth: "700px",
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
      height: "250px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f3f3",
      color: "#666",
      fontSize: "18px",
    },
    regenerateBtn: {
      padding: "10px",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
    },
    saveBtn: {
      padding: "12px",
      backgroundColor: "#198754",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
    backBtn: {
      padding: "10px",
      backgroundColor: "#ddd",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
    },
    warning: {
      color: "red",
      fontSize: "14px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2>✏️ 도서 수정</h2>

      {/* 제목 */}
      <input
        type="text"
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="책 제목"
      />

      {/* 저자 */}
      <input
        type="text"
        style={styles.input}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="저자"
      />

      {/* 요약 */}
      <textarea
        style={styles.textarea}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="책 요약"
      />

      {/* 이미지 */}
      <div style={styles.imageBox}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="AI 이미지"
            style={{ width: "100%", height: "100%", borderRadius: "6px" }}
          />
        ) : (
          "AI 이미지가 아직 생성되지 않았습니다"
        )}
      </div>

      {/* 요약 변경 시 경고 */}
      {isImageStale && (
        <div style={styles.warning}>
          요약이 변경되었습니다. 이미지를 다시 생성해야 합니다.
        </div>
      )}

      {/* 이미지 재생성 버튼 */}
      <button style={styles.regenerateBtn} onClick={handleRegenerateImage}>
        AI 이미지 재생성
      </button>

      {/* 저장 버튼 */}
      <button style={styles.saveBtn} onClick={handleSave}>
        수정 완료
      </button>

      {/* 뒤로가기 */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}
