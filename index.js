const express = require('express');
const index = express();
const port = 3000;

index.use(express.static('public'));

index.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
