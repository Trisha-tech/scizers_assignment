import Navbar from "./Navbar";

const MainPage = ({ navbar = true, children }) => {
  return (
    <>
      {navbar && <Navbar />}
      <div className="container mt-3">{children}</div>
    </>
  );
};

export default MainPage;
