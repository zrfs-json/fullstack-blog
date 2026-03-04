const app = require('./app')
const db = require('./models')

const PORT = 3000

//Koneksi ke Database
app.listen(PORT, async () => {
  console.log(`Backend jalan di http://localhost:${PORT}`)
  try{
    //test the database connection on startup
    await db.sequelize.authenticate();
    console.log('🟢 Sudah terkoneksi ke Database, Selamat ✔');
  } catch(error){
    console.error('🔴Unable to connect to the database❗❗', error)
  }
})