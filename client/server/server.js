const app = require('./app'); // ⬅️ remove `.default`
const PORT = process.env.PORT || 9091;

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
