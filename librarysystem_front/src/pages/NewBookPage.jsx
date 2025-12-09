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
import bookServices from "../services/bookService";

export default function NewBookPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [aiImages, setAiImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 summary 기반 프롬프트 생성
  const buildPrompt = () =>
    `Create a book cover illustration based on the following book summary:\n\n${summary}\n\nMake it visually appealing.`;

  // 📌 AI 이미지 생성
  const handleGenerateAICover = async () => {
    if (!summary.trim()) {
      alert("책 소개(summary)는 필수입니다.");
      return;
    }

    setLoading(true);
    try {
      const prompt = buildPrompt();
      const result = await bookServices.generateBookImage(prompt);

      let urls = [];
      if (typeof result === "string") urls = [result];
      else if (result.imageUrl) urls = [result.imageUrl];
      else if (Array.isArray(result.data)) urls = result.data.map((img) => img.url);

      if (urls.length === 0) {
        alert("이미지 생성 실패");
        return;
      }

      setAiImages(urls);
    } catch (err) {
      console.error("AI 이미지 생성 오류:", err);
      alert("이미지 생성 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 도서 등록 API 호출
  const handleCreateBook = async () => {
    if (!title || !author || !publisher || !summary || !coverImageUrl) {
      alert("필수 입력값이 누락되었습니다.");
      return;
    }

    const payload = {
      title,
      author,
      publisher,
      summary,
      coverImageUrl,
      registrationDate: new Date().toISOString().split("T")[0],
    };

    try {
      await bookServices.createBook(payload);
      alert("도서가 등록되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("도서 등록 실패:", err);
      alert("도서 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📘 새로운 도서 추가</Typography>

      <TextField label="책 제목" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="저자" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} />
      <TextField label="출판사" fullWidth value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      <TextField
        label="책 소개 (summary)"
        fullWidth
        multiline
        rows={4}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {/* AI 이미지 후보 */}
      {aiImages.length > 0 && (
        <Grid container spacing={2}>
          {aiImages.map((img, idx) => (
            <Grid key={idx}>
              <Paper
                onClick={() => setCoverImageUrl(img)}
                sx={{
                  border: coverImageUrl === img ? "3px solid #1976d2" : "1px solid #ccc",
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

      <Box display="flex" gap={2}>
        <Button variant="outlined" fullWidth disabled={loading} onClick={handleGenerateAICover}>
          {loading ? "이미지 생성 중..." : "AI 이미지 생성"}
        </Button>

        <Button variant="contained" fullWidth disabled={!coverImageUrl} onClick={handleCreateBook}>
          도서 등록
        </Button>
      </Box>

      <Button variant="text" fullWidth onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
