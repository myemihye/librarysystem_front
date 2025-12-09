import { Link } from "react-router-dom";

export default function Sidebar() {
  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    width: "180px",
    padding: "20px",
    gap: "15px",
    backgroundColor: "black",
    color: "white",
    borderRight: "1px solid #ddd",
    height: "100vh",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    padding: "8px 0",
  };

  // 🔐 관리자 여부 확인 (로그인 시 localStorage에 저장된 role 사용)
  const role = localStorage.getItem("role"); // 예: "ADMIN" 또는 null

  const isAdmin = role === "ADMIN";

  return (
    <div style={sidebarStyle}>
      <Link to="/" style={linkStyle}>
        도서목록
      </Link>

      {/* ⭐ 관리자일 때만 도서 추가 버튼 노출 */}
      {isAdmin && (
        <Link to="/add-book" style={linkStyle}>
          도서 추가
        </Link>
      )}
    </div>
  );
}
