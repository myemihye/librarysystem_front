import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// ========================================================================
// 📌 NewBookPage: 새로운 도서를 추가하는 화면
// - 지금은 dummy data 로 테스트 가능
// - 나중에 API 연결을 쉽게 하기 위해 구조를 API-friendly하게 설계함
// ========================================================================

export default function NewBookPage() {
  const navigate = useNavigate();

  // ----------------------
  // 📌 API 요청 Body 형태 그대로 state 구성
  //     { title, author, summary, coverImageUrl }
  // ----------------------
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null); // 최종 선택한 이미지

  // AI 이미지 후보 (dummy or API response)
  const [aiImages, setAiImages] = useState([]); // ["url1", "url2", ...]
  const [loading, setLoading] = useState(false);

  // ========================================================================
  // 📌 1) AI 이미지 생성 버튼
  //     → 지금은 dummy 이미지로 테스트
  //     → 실제 API 연결 시 아래 주석 구간만 수정하면 된다.
  // ========================================================================
  const handleGenerateAICover = async () => {
    setLoading(true);

    // -----------------------------------------
    // 🔵 TEST용 dummy (실제 API 없이 프론트만 테스트)
    // -----------------------------------------
    setTimeout(() => {
      setAiImages([
        "https://via.placeholder.com/200x260?text=AI+Cover+1",
        "https://via.placeholder.com/200x260?text=AI+Cover+2",
        "https://via.placeholder.com/200x260?text=AI+Cover+3",
        "https://via.placeholder.com/200x260?text=AI+Cover+4",
      ]);
      setLoading(false);
    }, 800);

    // -----------------------------------------
    // 🟢 추후 실제 API 연동 시 (axios 예시)
    // -----------------------------------------
    /*
    const res = await generateAICover({
      title: title,
      summary: summary,
      style: "default"
    });
    setAiImages(res.data.candidates);  // 4개의 이미지 URL
    */
  };

  // ========================================================================
  // 📌 2) 도서 등록 버튼
  //     → 지금은 console.log + navigate("/")
  //     → 실제 API 연결 시 createBook(payload)로 전송
  // ========================================================================
  const handleCreateBook = async () => {
    const payload = {
      title,
      author,
      summary,
      coverImageUrl,
    };

    console.log("📌 등록 요청 데이터:", payload);

    // -----------------------------------------
    // 🟢 추후 실제 API 연동 시
    // -----------------------------------------
    /*
    await createBook(payload);
    navigate("/");
    */

    // 테스트용 이동
    navigate("/");
  };

  return (
    <Box
      maxWidth="750px"
      mx="auto"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Typography variant="h5">📘 새로운 도서 추가</Typography>

      {/* ---------------------------------- */}
      {/*  책 제목 input */}
      {/* ---------------------------------- */}
      <TextField
        label="책 제목"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ---------------------------------- */}
      {/*  저자 input */}
      {/* ---------------------------------- */}
      <TextField
        label="저자"
        fullWidth
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {/* ---------------------------------- */}
      {/*  책 요약 input */}
      {/* ---------------------------------- */}
      <TextField
        label="책 요약"
        fullWidth
        multiline
        rows={4}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {/* ---------------------------------- */}
      {/* AI 이미지 후보 미리보기 */}
      {/* ---------------------------------- */}
      {aiImages.length > 0 && (
        <Grid container spacing={2}>
          {aiImages.map((img, idx) => (
            <Grid item xs={3} key={idx}>
              <Paper
                onClick={() => setCoverImageUrl(img)}
                sx={{
                  border:
                    coverImageUrl === img
                      ? "3px solid #1976d2"
                      : "1px solid #ccc",
                  cursor: "pointer",
                  p: 1,
                }}
              >
                <img src={img} width="100%" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ---------------------------------- */}
      {/* 버튼 영역 */}
      {/* ---------------------------------- */}

      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleGenerateAICover}
          disabled={loading}
        >
          {loading ? "이미지 생성 중..." : "AI 이미지 생성"}
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={!coverImageUrl}
          onClick={handleCreateBook}
        >
          도서 등록
        </Button>
      </Box>

      {/* ---------------------------------- */}
      {/* 뒤로가기 */}
      {/* ---------------------------------- */}
      <Button variant="text" fullWidth onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
