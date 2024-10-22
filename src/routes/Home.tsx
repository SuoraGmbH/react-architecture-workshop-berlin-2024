import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <Link className="text-blue-500" to="/raycast">
        Raycast
      </Link>
      <Link className="text-blue-500" to="/projects">
        Projects
      </Link>
      <Link className="text-blue-500" to="/clients">
        Clients
      </Link>
    </div>
  );
};
