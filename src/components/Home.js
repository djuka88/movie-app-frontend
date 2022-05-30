import useAuth from "./hooks/useAuth";
import Movies from "./Movies";

function Home() {
  const { user } = useAuth();

  // const {
  //   data: movies,
  //   isFetching: loading,
  //   error,
  // } = useGetAllMoviesQuery();

  // const queryClient = useQueryClient();

  // const response = await queryClient.refetchQueries(['movies']);

  // console.log(response);

  console.log("Home!");
  return (
    <div>
      {user && (
        <>
          <Movies />
        </>
      )}
    </div>
  );
}

export default Home;
