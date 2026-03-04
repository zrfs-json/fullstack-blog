const db = require('../models')
const { User } = db 

exports.register = async (req, res) => {
  try{
      const { username, role ,email, password, repassword } = req.body
      console.log(req.body)
  
      if(!email || !password){
        return res.status(400).json({message: "Wajib isi!"})
      }
      if(!repassword){
        return res.status(400).json({message: "Silahkan isi ulang Password anda"})
      }
  
      if(password != repassword){
        return res.status(400).json({message: "Password tidak sama"})
      }
  
      try{
        const newAccount = await User.create({
          email, password, role, username
        });
        res.status(201).json({
          message: "Account berhasil ditambahkan!!🟢",
          data: newAccount})
      } catch {
        return res.status(400).json({message: "Tidak dapat memuat data (ERROR🛑)"})
      }
  
  
    }catch (error){
      console.error("BACA ERRORNYA DI SINI NARA:", error); 
      return res.status(500).json({ message: "Masalah dari kami!" });
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email){
      return res.status(400).json({message: "Email wajib diisi"})
    } 
    if (!password) {
      return res.status(400).json({ message: "Password wajib isi" })
    }

    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
      return res.status(401).json({ message: "Email Salah" }); 
    }
    
    if (password !== user.password) {
      return res.status(401).json({ message: "password salah" });
    }

    return res.status(200).json({
      message: `Login berhasil`
    });

  } catch (error) {
    // 7. BACA TERMINAL LO: Kalau masih 500, node.js bakal nge-print alasannya di sini!
    console.error("BACA ERRORNYA DI SINI NARA:", error); 
    return res.status(500).json({ message: "Masalah dari kami!" });
  }
}