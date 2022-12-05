const axios = require('axios');
const CryptoJS = require("crypto-js");

const apiKey = process.env.APIMEDIC_API_KEY;
const uri = process.env.APIMEDIC_AUTHSERVICE_URL;
const healthserviceUri = process.env.APIMEDIC_HEALTHSERVICE_URL;
const secret_key = process.env.APIMEDIC_SECRET_KEY;


async function loadToken() {
  // 1. generate hash using secret key
  const computedHash = CryptoJS.HmacMD5(uri, secret_key);
  const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
  let tokenObject;
  // 2. send hash as header
  try {
    await axios({
      url: uri,
      headers: {
        'Authorization': `Bearer ${apiKey}:${computedHashString}`,
        'Content-Type': 'application/json',
      },
      data: '',
      method: 'POST'
    }).then((response) => {
      tokenObject = response.data
      // 3. collect token
      return tokenObject;
    }).catch(
      (err => console.log("err in function:", err))
    );
  } catch (err) {
    console.log("Error:", err)
    const errorobject = { status: err.response.status, statusText: err.response.statusText }
    return errorobject;
  }
  return tokenObject;
}

async function axiosRequest(params, token) {
  const paramsForDiagnosis = params.name && params.symptoms && params.gender && params.yearOfBirth
  const paramsForOneIssue = (params.name === 'issues') && params.id
  const paramsForOneLocation = (params.name === 'body/locations') && params.id
  const paramsForBodySymptoms = (params.name === 'symptoms') && params.locationId && params.gender
  let allParams;
  if (paramsForOneIssue) {
    allParams = `${params.name}/${params.id}/info?`
  } else if (paramsForOneLocation) {
    allParams = `${params.name}/${params.id}?`
  } else if (paramsForBodySymptoms) {
    allParams = `${params.name}/${params.locationId}/${params.gender}?`
  } else if (paramsForDiagnosis) {
    allParams = `${params.name}?symptoms=${params.symptoms}&gender=${params.gender}&year_of_birth=${params.yearOfBirth}&`
  } else {
    allParams = `${params.name}?`
  }
  // console.log("allParams:", allParams)

  let healthData = {};
  await axios({
    url: `${healthserviceUri}/${allParams}token=${token}&format=json&language=en-gb`,
    method: 'GET'
  }).then((response) => {
    // console.log("response:", response)
    healthData = response
    // healthData.status = response.status
    // healthData.data = response.data
  }).catch((err => {
    console.log("err in axios:", err)
    // healthData.status = err.response.status
    // healthData.data = err.response.data
    healthData = err.response
  }))
  return healthData;
}

// 4. use token to get data
async function loadData(params, token) {
  try {
    return await axiosRequest(params, token)
  } catch (err) {
    const errorobject = { status: err.response.status, statusText: err.response.statusText }
    return errorobject;
  }
}



module.exports = { loadToken, loadData };



