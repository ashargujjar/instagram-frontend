export default function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const isEdited = localStorage.getItem("edited") === "true";

  if (!isAuthenticated) return <Navigate to="/" />;

  if (!isEdited) return <Navigate to="/editProfile" />;

  return children;
}
