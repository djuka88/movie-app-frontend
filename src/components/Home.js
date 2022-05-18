import useAuth from "./hooks/useAuth";
import Navbar from "./Navbar";

function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      {user && (
        <>
          <h1>Welcome {user.name} !</h1>
        </>
      )}
    </div>
  );
}

export default Home;
