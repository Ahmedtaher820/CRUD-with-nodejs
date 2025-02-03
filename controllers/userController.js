const Users = require("../models/User");
const createUser = async (req, res) => {
  const user = new Users(req.body);
  await user.save();
  res.status(201).json({ data: req.body });
  console.log(req.body);
};
const getUsers = (req, res) => {
  Users.find().then((result) => {
    // let user = {}
    // user = result.find((item)=> item._id === req.body._id)
    res.status(200).json({ data: result });
  });
};

const getUserById = (req, res) => {
  Users.findById(req.params.id).then((result) => {
    console.log(res);
    res.status(200).json({ data: result });
  });
};

const deleteUser = (req, res) => {
  // i can use findByIdDelete ==> this if i need to return the object of the user which recently deleted
  // i can use deleteOn ==> this if i need to not return anything
  // deleteOne ==> model.deleteOne({_id:req.params.id})
  Users.findByIdAndDelete(req.params.id).then((result) => {
    res
      .status(201)
      .json({ message: "user is delete successfully", status: 201 });
  });
};

const updateUser = (req, res) => {
  //or ==> findBuIdAndUpdate(req.params.id,req.body)
  Users.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(201).json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
const getUserBySearch = async (req, res) => {
  // Users.find({age:24}) ==> to get the object have age = 24
  // Users.find({age:{$gt:24}}) ==> to get the age is greater than 24
  //Users.find({age:{$gte:24}})  ==> to get the age is greater than or Equal 24
  //Users.find({age:{$lt:24}})  ==> to get the age is less than  24
  //Users.find({age:{$lte:24}})  ==> to get the age is less than or Equal 24
  //Users.find({name:'ali')  ==> to get the name is ali
  //if i have firstname and lastname and i need to search in search box to get any name related to ali whatever is first name or last name
  //so i have to use $or ==> find({$or:[{firstname:'ali'},{lastname:'ali'}]})
  const { search } = req.query;
  if (!search.trim()) {
    return Users.find()
      .then((result) => {
        return res.status(200).json({ data: result });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  }
  return Users.find({ userName: new RegExp(search.trim(), "i") })
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.message }));
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserBySearch,
};
