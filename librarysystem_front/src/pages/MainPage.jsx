import { useState, useEffect } from "react";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import BookCard from "../books/BookCard";
import { fetchBooks, searchBooks } from "../services/bookService";
import { useSearch } from "../context/SearchContext";

export default function MainPage() {
  const { keyword } = useSearch();

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("latest"); // ✔ 정렬 추가

  // 검색어 바뀌면 페이지 초기화
  useEffect(() => {
    if (!keyword || keyword.trim() === "") {
      setPage(1);
    }
  }, [keyword]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // ✔ 검색 모드
        if (keyword && keyword.trim() !== "") {
          const data = await searchBooks(keyword);
          setBooks(data.books || data);
          setTotalPages(1);
          return;
        }

        // ✔ 전체 조회 + 정렬
        const data = await fetchBooks({ page, sort });

        setBooks(data.books || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("도서 목록 불러오기 실패:", err);
      }
    };

    loadBooks();
  }, [keyword, page, sort]); // ✔ sort 추가

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <h2>도서 목록</h2>

      {/* ✔ 정렬 드롭다운 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: "6px", fontSize: "14px" }}
        >
          <option value="latest">최신순</option>
          <option value="title">제목순</option>
          <option value="price">가격순</option>
        </select>
      </Box>

      {books.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid key={book.bookNo}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}

      {(!keyword || keyword.trim() === "") && (
        <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}
