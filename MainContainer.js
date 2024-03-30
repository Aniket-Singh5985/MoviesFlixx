import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer =() => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return;

    const mainMovie =movies[0];

    const { original_title, overview} = mainMovie;
    return (
        <div>
            <p>Aniket</p>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground /> 
        </div>
    );
};
export default MainContainer;