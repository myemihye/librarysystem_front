// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/bookService"; // ⭐ 회원가입 API

export default function SignupPage() {
  const navigate = useNavigate();

  // 폼 입력값 상태
  const [name, setName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단 필수값 체크
    if (!name || !memberId || !password || !phone || !address) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);

      // ✅ API 정의서에 맞게 호출
      const res = await signup({
        memberId,
        password,
        name,
        phone,
        address,
      });

      // 정의서: { "status": 201, "msg": "가입완료" }
      if (res?.status === 201) {
        alert(res.msg || "회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        // 혹시 status 형식이 달라도 최소한 메시지는 보여주기
        alert(res?.msg || "회원가입 처리 결과를 확인할 수 없습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#e9ecef",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* 상단 타이틀 */}
        <Typography variant="h6" align="center" sx={{ fontWeight: 700, mb: 1 }}>
          BookShelf
        </Typography>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          회원가입
        </Typography>

        {/* 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="이름"
            variant="outlined"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="회원번호"
            placeholder="예: 12345"
            variant="outlined"
            size="small"
            fullWidth
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />

          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="전화번호"
            variant="outlined"
            size="small"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            label="주소"
            variant="outlined"
            size="small"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              borderRadius: 999,
              py: 1.1,
            }}
            disabled={loading}
          >
            {loading ? "가입 처리 중..." : "회원가입"}
          </Button>
        </Box>

        {/* 로그인으로 이동 */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate("/login")}
        >
          이미 계정이 있으신가요? 로그인
        </Typography>

        {/* 메인으로 이동 */}
        <Button
          variant="body2"
          size="small"
          sx={{
            mt: 1,
            display: "block",
            mx: "auto",
          }}
          onClick={() => navigate("/")}
        >
          메인으로 이동
        </Button>
      </Paper>
    </Box>
  );
}
