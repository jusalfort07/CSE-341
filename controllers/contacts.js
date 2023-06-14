const mongodb = require('../connection');
const objectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
  const result = await mongodb.getDb().db('cse341_contacts').collection('contacts').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContact = async (req, res) => {
  const id = new objectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341_contacts')
    .collection('contacts')
    .find({ _id: id });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db('cse341_contacts')
    .collection('contacts')
    .insertOne(data);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating a contact!');
  }
};

const updateContact = async (req, res) => {
  const id = new objectId(req.params.id);

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db('cse341_contacts')
    .collection('contacts')
    .replaceOne({ _id: id }, data);

  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating a contact!');
  }
};

const deleteContact = async (req, res) => {
  const id = new objectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db('cse341_contacts')
    .collection('contacts')
    .deleteOne({ _id: id }, true);

  console.log(response);

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting a contact!');
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};
