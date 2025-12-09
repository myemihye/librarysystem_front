import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import bookServices from "../services/bookService";

export default function DetailBookPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [book, setBook] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 관리자 여부
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  // =======================================
  // 📌 도서 상세 조회
  // =======================================
  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await bookServices.fetchBookById(bookId);
        setBook(res);
      } catch (err) {
        console.error("상세 조회 오류:", err);
        alert("서버 오류가 발생했습니다.");
      }
    };
    loadDetail();
  }, [bookId]);

  if (!book) return <Typography>Loading...</Typography>;

  // =======================================
  // 📌 대여
  // =======================================
  const handleRent = async () => {
    try {
      setLoading(true);

      const res = await bookServices.createLoan({
        bookId: Number(bookId),
        memberId: "1"
      });

      setLoanId(res.loanId);
      setBook((prev) => ({ ...prev, stockcount: 0 }));

    } catch (err) {
      console.error("대여 실패:", err);
      alert("대여 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // =======================================
  // 📌 반납
  // =======================================
  const handleReturn = async () => {
    try {
      setLoading(true);

      await bookServices.returnRental(loanId);

      setLoanId(null);
      setBook((prev) => ({ ...prev, stockcount: 1 }));

    } catch (err) {
      console.error("반납 실패:", err);
      alert("반납 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📖 도서 상세 정보</Typography>

      {/* 표지 이미지 */}
      <Paper variant="outlined">
        <img
          src={book.coverImageUrl}
          alt="cover"
          style={{ width: "100%", borderRadius: 6 }}
        />
      </Paper>

      {/* 책 정보 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 제목</Typography>
        <Typography>{book.title}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">저자</Typography>
        <Typography>{book.author}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">출판사</Typography>
        <Typography>{book.publisher}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">장르</Typography>
        <Typography>{book.genre}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">태그</Typography>
        <Typography>{book.tag}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">재고</Typography>
        <Typography>{book.stockcount}</Typography>
      </Paper>

      <Grid container spacing={2}>
        {/* 대여 버튼 */}
        {book.stockcount > 0 && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleRent}
            >
              대여하기
            </Button>
          </Grid>
        )}

        {/* 반납 버튼 */}
        {loanId && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              disabled={loading}
              onClick={handleReturn}
            >
              반납하기
            </Button>
          </Grid>
        )}
      </Grid>

      {/* 🔧 관리자 전용 수정 버튼 */}
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/edit-book/${bookId}`)}
        >
          수정하기
        </Button>
      )}
    </Box>
  );
}
