import express from 'express'
const app = express()
import cors from 'cors'
const port = process.env.PORT || 3001
import Neis from '@my-school.info/neis-api'
const neis = new Neis({ KEY: "d374573af8d34cddaf4e4c250b995c8c", Type: "json" });

let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let daydata: string = year + month + day;

app.use(cors())

app.get('/', (_, res) => {
  res.send("rice api server")
})

app.get('/meal/:name', async (req, res) => {

  const name = req.params.name

  const school = await neis.getSchoolInfo({ SCHUL_NM: name })
  const mealInfo = await neis.getMealInfo({ ATPT_OFCDC_SC_CODE: school[0].ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE: school[0].SD_SCHUL_CODE, MLSV_YMD: daydata })
  
  res.send(mealInfo[1])

})

app.get('/info/:name', async(req, res) => {

  const name = req.params.name

  const school = await neis.getSchoolInfo({ SCHUL_NM: name })
  
  res.send(school[0])

})

app.listen(port, () => { console.log(`http://localhost:${port}/`) })