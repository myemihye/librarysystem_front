import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();
  const { bookNo, title, author, coverImageUrl, isLoaned } = book;

  const isRented = isLoaned === '대출 불가';

  return (
    <Card
      onClick={() => navigate(`/book/${bookNo}`)}
      sx={{
        width: '200px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        transition: '0.3s',
        cursor: 'pointer',
        p: 1.5,
        '&:hover': { boxShadow: 6 }
      }}
    >
      <CardMedia
        component="img"
        image={coverImageUrl}
        alt={title}
        sx={{ pr: 1.5, pb: 0 }}
      />

      <CardContent sx={{ flexGrow: 1, p: 1.5, pb: 0 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
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
            fontWeight="bold"
            mt={0.5}
            display="block"
          >
            대출 불가
          </Typography>
        )}
      </CardContent>

      {/* 👇 버튼 대신 상태 텍스트 표시 */}
      <Box sx={{ width: '100%', textAlign: 'right' }} >
        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{
            color: isRented ? 'error.main' : 'primary.main'
          }}
        >
          {isRented ? '대출 불가' : '대출 가능'}
        </Typography>
      </Box>
    </Card>
  );
}

export default BookCard;
