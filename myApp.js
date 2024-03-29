require('dotenv').config();

const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI,{useNewURLParser: true,useUnifiedTopology: true});



let Person;

const personSchema = {
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
}

Person = mongoose.model('Person',personSchema);

const createAndSavePerson = (done) => {
  let johnWick = new Person({name: 'John Wick',age: 55, favoriteFoods: ['Pizza','Pasta','Pad Thai']});

  johnWick.save(function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    } 
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findOne({_id:personId},function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    }
  })
  
  
  
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,function(err,person){
    if(err){
      console.error(err);
      done(err);
    }else{
      person.favoriteFoods.push(foodToAdd);
      person.save(function(err,updatedPerson){
        if(err){
          console.error(err);
          done(err);
        }
        else{
          done(null,updatedPerson);
        }
      })
    }
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName},{age: ageToSet},{new: true},function(err,person){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,person);
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},function(err,data){
    if(err){
      console.error(err);
      done(err);
    }else{
      done(null,data);
    }
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select("_id name favoriteFoods")
    .exec(function(err,data){
      if(err){
        console.error(err);
        done(err);
      }else{
        done(null,data);
      }
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
