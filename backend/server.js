const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the nhl application!' });
});

require("./routes/team_routes.js")(app);
require("./routes/player_routes.js")(app);
require("./routes/game_routes.js")(app);
require("./routes/season_routes.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
