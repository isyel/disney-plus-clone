import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
	const dispatch = useDispatch();
	const userName = useSelector(selectUserName);
	let recommends = useRef([]);
	let newDisneys = useRef([]);
	let originals = useRef([]);
	let trending = useRef([]);

	useEffect(() => {
		db.collection("movies").onSnapshot((snapshot) => {
			snapshot.docs.forEach((doc) => {
				recommends.current =
					doc.data().type === "recommend"
						? [...recommends.current, { id: doc.id, ...doc.data() }]
						: recommends.current;

				newDisneys.current =
					doc.data().type === "new"
						? [...newDisneys.current, { id: doc.id, ...doc.data() }]
						: newDisneys.current;

				originals.current =
					doc.data().type === "original"
						? [...originals.current, { id: doc.id, ...doc.data() }]
						: originals.current;

				trending.current =
					doc.data().type === "trending"
						? [...trending.current, { id: doc.id, ...doc.data() }]
						: trending.current;
			});

			dispatch(
				setMovies({
					recommend: recommends.current,
					newDisney: newDisneys.current,
					original: originals.current,
					trending: trending.current,
				})
			);
		});
	}, [userName, dispatch]);

	return (
		<Container>
			<ImgSlider />
			<Viewers />
			<Recommends />
			<NewDisney />
			<Originals />
			<Trending />
		</Container>
	);
};

const Container = styled.main`
	position: relative;
	min-height: calc(100vh - 250px);
	overflow-x: hidden;
	display: block;
	top: 72px;
	padding: 0 calc(3.5vw + 5px);

	&:after {
		background: url("/images/home-background.png") center center / cover
			no-repeat fixed;
		content: "";
		position: absolute;
		inset: 0px;
		opacity: 1;
		z-index: -1;
	}
`;

export default Home;
