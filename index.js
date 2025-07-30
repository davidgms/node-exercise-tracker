const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
let bodyParser = require("body-parser");
const crypto = require("crypto");

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [];
const userExercises = [];

app.route("/api/users")
	.post((req, res) => {
		const username = req.body.username;
		const id = crypto.randomBytes(12).toString("hex");
		const newUser = {
			username: username,
			_id: id,
		};
		users.push(newUser);

		const newUserForExercises = {
			username: username,
			_id: id,
			count: 0,
			log: [],
		};
		userExercises.push(newUserForExercises);

		res.json(newUser);
	})
	.get((req, res) => {
		res.json(users);
	});

app.post("/api/users/:_id/exercises", (req, res) => {
	const inputDate = req.body.date;
	const inputDescription = req.body.description;
	const inputDuration = parseInt(req.body.duration, 10);
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	const currentUser = userExercises.find(
		(item) => item._id === req.params._id
	);

	if (!currentUser) {
		return res.json({ error: "Invalid user ID" });
	}

	if (inputDate && !dateRegex.test(inputDate)) {
		return res
			.status(400)
			.json({ error: "Date must have yyyy-mm-dd format." });
	}

	const date = inputDate ? new Date(inputDate) : new Date();

	if (typeof inputDescription !== "string") {
		return res.status(400).json({ error: "Description must be a string." });
	}

	if (isNaN(inputDuration)) {
		return res.status(400).json({ error: "Duration must be a number." });
	}

	const newExercise = {
		description: inputDescription,
		duration: inputDuration,
		date: date,
	};
	currentUser.log.push(newExercise);
	currentUser.count += 1;

	const exerciseResponse = {
		username: currentUser.username,
		_id: currentUser._id,
		description: newExercise.description,
		duration: newExercise.duration,
		date: newExercise.date.toDateString(),
	};
	res.json(exerciseResponse);
});

app.get("/api/users/:_id/logs", (req, res) => {
	const currentUser = userExercises.find(
		(item) => item._id === req.params._id
	);

	if (!currentUser) {
		return res.status(404).json({ error: "User not found" });
	}

	const { from, to, limit } = req.query;
	let log = [...currentUser.log];

	if (from) {
		const fromDate = new Date(from);
		log = log.filter((exercise) => exercise.date >= fromDate);
	}

	if (to) {
		const toDate = new Date(to);
		log = log.filter((exercise) => exercise.date <= toDate);
	}

	if (limit) {
		log = log.slice(0, parseInt(limit, 10));
	}

	res.json({
		_id: currentUser._id,
		username: currentUser.username,
		count: log.length,
		log: log.map((exercise) => ({
			description: exercise.description,
			duration: exercise.duration,
			date: exercise.date.toDateString(),
		})),
	});
});
