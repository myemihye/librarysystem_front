import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();
  const { id, title, author, coverUrl, status } = book;

  const isRented = status === '대출 중';
  const buttonColor = isRented ? 'error' : 'primary';
  const buttonText = isRented ? '대출 중' : '대출';

  return (
      /* 25.12.05 심미혜
         북카드 클릭시 상세페이지 이동 추가*/
    <Card
      onClick={() => navigate(`/book/${id}`)}  // 👈 상세페이지로 이동
      sx={{
        width: '200px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        transition: '0.3s',
        cursor: 'pointer',                 // 👈 클릭 가능 표시
        '&:hover': { boxShadow: 6 }
      }}
    >
      {/* 1. 책 표지 이미지 */}
      <CardMedia
        component="img"
        image={coverUrl}
        alt={title}
        sx={{ p: 1.5, pb: 0 }}
      />

      {/* 2. 도서 상세 정보 */}
      <CardContent sx={{ flexGrow: 1, p: 1.5, pb: 0 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          component="div"
          noWrap
          title={title}
        >
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {author}
        </Typography>

        {isRented && (
          <Typography
            variant="caption"
            color="error"
            display="block"
            mt={0.5}
            fontWeight="bold"
          >
            대출 중
          </Typography>
        )}
      </CardContent>

      {/* 3. 대출 버튼 */}
      <Box sx={{ position: 'relative' }}>
        <Button
          variant="contained"
          color={buttonColor}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            fontWeight: 'bold',
            minWidth: 'auto',
            ...(isRented && {
              backgroundColor: '#757575',
              color: 'white',
              '&:hover': { backgroundColor: '#757575' }
            })
          }}
          disabled={isRented}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
}

export default BookCard;
