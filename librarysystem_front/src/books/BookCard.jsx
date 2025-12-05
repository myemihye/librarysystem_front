import React, { useState } from 'react'; // 1. useState 훅 import
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material';

function BookCard({ book }) {
  const { title, author, coverUrl,status } = book;
  
  const isRented = status === '대출 중';
  const buttonColor = isRented ? 'error' : 'primary'; 
  const buttonText = isRented ? '대출 중' : '대출';

  return (
    <Card 
      sx={{ 
        width: '200px',
        height: '300px', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: 2, 
        transition: '0.3s',
        '&:hover': { boxShadow: 6 } // 마우스 오버 시 입체감 추가
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
        {/* 도서명 (강조) */}
        <Typography 
          variant="subtitle1" 
          fontWeight="bold" 
          component="div"
          noWrap
          title={title} // 마우스 오버 시 전체 제목 표시
        >
          {title}
        </Typography>
        
        {/* 지은이 */}
        <Typography variant="body2" color="text.secondary" noWrap>
          {author}
        </Typography>
        
        {/* '대출 중' 상태 */}
        {isRented && (
            <Typography variant="caption" color="error" display="block" mt={0.5} fontWeight="bold">
                대출 중
            </Typography>
        )}
      </CardContent>

      {/* 3. 대출 버튼 */}
      {/* 1. 이미지 및 버튼 래퍼 (position: relative 설정) */}
      <Box sx={{ position: 'relative' }}>         
          
          {/* 1-2. 대출 버튼 (position: absolute 설정) */}
          <Button 
            variant="contained" 
            color={buttonColor}
            size="small" // 버튼 크기를 작게
            sx={{ 
              // 👇 이 부분이 버튼을 오른쪽 하단에 위치시키는 핵심입니다.
              position: 'absolute', 
              bottom: 10,           
              right: 10,            
              fontWeight: 'bold',
              minWidth: 'auto',
              // 대출 중일 때 스타일 오버라이드
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