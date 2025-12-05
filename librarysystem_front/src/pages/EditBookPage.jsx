import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// ========================================================================
// 📌 DetailBookPage
// - 도서 상세 정보를 조회하고 대출 / 반납 기능을 제공하는 페이지
// - 지금은 Dummy 데이터를 기반으로 동작
// - 나중에 API를 쉽게 붙일 수 있도록 구조를 API-friendly하게 구성
// ========================================================================

export default function DetailBookPage() {
  const navigate = useNavigate();
  const { book_id } = useParams();

  // ========================================================================
  // 📌 도서 상세 정보 state (API Response 구조 그대로)
  // GET /books/{bookId} 응답 형태에 맞춤
  // ========================================================================
  const [book, setBook] = useState({
    bookId: book_id,
    title: "",
    author: "",
    summary: "",
    coverImageUrl: "",
    stockCount: 0,        // 전체 재고
    availableStock: 0,    // 대출 가능 재고
  });

  // rentalId는 대출 성공 시 서버에서 받아옴
  const [rentalId, setRentalId] = useState(null);

  // ========================================================================
  // 📌 Dummy 데이터 로드 (실제 API 호출 부분)
  // ========================================================================
  useEffect(() => {
    // 🔵 Dummy Data 로 테스트
    const dummyDetail = {
      bookId: book_id,
      title: "예시 도서 제목",
      author: "홍길동",
      summary: "이 책은 도서 상세 페이지 테스트용 더미 요약입니다.",
      coverImageUrl: "https://via.placeholder.com/200x260?text=Cover",
      stockCount: 5,
      availableStock: 3,
    };

    setBook(dummyDetail);

    // 🟢 실제 API 연결 시
    /*
    const res = await getBookById(book_id);
    setBook(res.data);
    */
  }, [book_id]);

  // ========================================================================
  // 📌 대출하기 (POST /rentals)
  // ========================================================================
  const handleRent = async () => {
    // 🔵 dummy test
    setRentalId(123);          // 가짜 rentalId 생성
    setBook(prev => ({
      ...prev,
      availableStock: prev.availableStock - 1,
    }));

    // 🟢 실제 API
    /*
    const res = await rentBook(book.bookId);
    setRentalId(res.data.rentalId);
    setBook(prev => ({
      ...prev,
      availableStock: prev.availableStock - 1
    }));
    */
  };

  // ========================================================================
  // 📌 반납하기 (PATCH /rentals/{rentalId}/return)
  // ========================================================================
  const handleReturn = async () => {
    // 🔵 dummy test
    setRentalId(null);
    setBook(prev => ({
      ...prev,
      availableStock: prev.availableStock + 1,
    }));

    // 🟢 실제 API
    /*
    await returnRental(rentalId);
    setRentalId(null);
    setBook(prev => ({
      ...prev,
      availableStock: prev.availableStock + 1
    }));
    */
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📖 도서 상세 정보</Typography>

      {/* 표지 이미지 */}
      <Paper
        variant="outlined"
        sx={{
          height: 260,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={book.coverImageUrl}
          style={{ width: "100%", height: "100%", borderRadius: 6 }}
        />
      </Paper>

      {/* 제목 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 제목</Typography>
        <Typography>{book.title}</Typography>
      </Paper>

      {/* 저자 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">저자</Typography>
        <Typography>{book.author}</Typography>
      </Paper>

      {/* 요약 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 요약</Typography>
        <Typography>{book.summary}</Typography>
      </Paper>

      {/* 재고 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">재고 현황</Typography>
        <Typography>전체 재고: {book.stockCount}</Typography>
        <Typography>대출 가능: {book.availableStock}</Typography>
      </Paper>

      {/* 버튼 그룹 */}
      <Grid container spacing={2}>
        {/* 수정 */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate(`/book/${book_id}/edit`)}
          >
            도서 수정
          </Button>
        </Grid>

        {/* 대출 */}
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            disabled={book.availableStock === 0 || rentalId !== null}
            onClick={handleRent}
          >
            대출
          </Button>
        </Grid>

        {/* 반납 */}
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            disabled={rentalId === null}
            onClick={handleReturn}
          >
            반납
          </Button>
        </Grid>
      </Grid>

      {/* 뒤로가기 */}
      <Button variant="text" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
