import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";  // 📌 삭제 API 호출용

export default function DetailBookPage() {
  const navigate = useNavigate();
  const { book_id } = useParams();

  const dummyBook = {
    book_id,
    title: "예시 도서 제목",
    author: "홍길동",
    summary: "이 책은 UI 테스트를 위해 만든 예시 요약입니다.",
    imageUrl: "",
  };

  const [status, setStatus] = useState("대출 가능");

  // ======================================================
  // 📌 도서 삭제 기능 추가
  // ======================================================
  const handleDeleteBook = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await axios.delete(`/api/books/delete/${book_id}`);
      alert("도서가 삭제되었습니다.");
      navigate("/"); // 삭제 후 목록으로 이동
    } catch (err) {
      console.error(err);
      alert("삭제 중 문제가 발생했습니다.");
    }
  };

  return (
    <Box maxWidth="700px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📖 도서 상세 정보</Typography>

      {/* 이미지 */}
      <Paper
        variant="outlined"
        sx={{ height: 250, display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography color="text.secondary">AI 생성 이미지 미리보기</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 제목</Typography>
        <Typography>{dummyBook.title}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">저자</Typography>
        <Typography>{dummyBook.author}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 요약</Typography>
        <Typography>{dummyBook.summary}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">대출 상황</Typography>
        <Typography>{status}</Typography>
      </Paper>

      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => navigate(`/book/${book_id}/edit`)}
        >
          도서 수정
        </Button>

        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={status === "대출 중"}
          onClick={() => setStatus("대출 중")}
        >
          대출
        </Button>

        <Button
          variant="contained"
          color="error"
          fullWidth
          disabled={status === "대출 가능"}
          onClick={() => setStatus("대출 가능")}
        >
          반납
        </Button>
      </Box>

      {/* ===================================== */}
      {/* 📌 삭제 버튼 추가 */}
      {/* ===================================== */}
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={handleDeleteBook}
      >
        도서 삭제
      </Button>

      <Button variant="text" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
