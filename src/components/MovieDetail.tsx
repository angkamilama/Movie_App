import { useParams } from "react-router-dom";
function MovieDetail() {
  let params = useParams();
  console.log(params);

  return <div>jj</div>;
}

export default MovieDetail;
