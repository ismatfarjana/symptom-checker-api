const mongoose = require('mongoose');
const Symptom = require('../models/symptoms');
const { loadToken, loadData } = require('../../utils/apimedic/apimedic')


const getToken = async (req, res) => {
  // get token
  //  TODO: add created at time while creating token to check validity,
  //        if not valid, call for new token
  const tokenObject = await loadToken();
  return tokenObject.Token;
}


const getSymptoms = async (req, res) => {
  const token = await getToken();
  const params = { name: 'symptoms' };
  const symptomsDataset = await loadData(params, token);

  if (!symptomsDataset) res.status(500).json({ message: 'Error on getting symptoms from apimedic' })
  return res.json({ status: symptomsDataset.status, symptomsDataset: symptomsDataset.data });
}

const getIssues = async (req, res) => {
  const token = await getToken();
  const params = { name: 'issues' };
  const issuesDataset = await loadData(params, token);

  if (!issuesDataset) res.status(500).json({ message: 'Error on getting issues from apimedic' })
  return res.json({ status: issuesDataset.status, issuesDataset: issuesDataset.data });
}

const getOneIssue = async (req, res) => {
  const token = await getToken();
  const params = { name: 'issues', id: req.params.id };

  const oneIssue = await loadData(params, token);

  if (!oneIssue) res.status(500).json({ message: 'Error on getting issues from apimedic' })
  return res.json({ status: oneIssue.status, oneIssue: oneIssue.data });
}


module.exports = { getSymptoms, getIssues, getOneIssue }