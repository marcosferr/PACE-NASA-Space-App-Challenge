import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex py-4 px-8 justify-between">
      <Link to="/">
        <h1 className="text-sm font-bold text-green-600">ARANDU PACE</h1>
      </Link>
    </header>
  );
};

export default Header;
