const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { upload } = require("../middleware/multer");
const { options } = require("../uploads/path");
const { Offers } = require("../models/offer");
const { Faq } = require("../models/faq");
const { Services } = require("../models/services");
const { Category } = require("../models/category");
const verifyToken = require("./auth/verify");
const { Query } = require("../models/query");
const { Client } = require("../models/client");
const { Sub_Category } = require("../models/sub_category");
const { resolveSoa } = require("dns");

//-----------------------------------ADD OFFER -----------------------------------------------------------
const offer = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    console.log(req.file.path);
    if (auth.user_type === "admin" || " ") {
      const offers = new Offers({ name: req.body.name, image: req.file.path });
      await offers.save();
      return res.send(offers);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//------------------------------------SHOW OFFER-----------------------------------------------------------
const showOffer = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin" || " ") {
      const offer = await Offers.find();
      return res.send(offer);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//-----------------------------------VIEW OFFER--------------------------------------------------------
const viewOffer = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin") {
      const offer = await Offers.findById(req.params.id);
      let image = offer.image;
      var fileName = image.slice(12);
      console.log(fileName);
      res.sendFile(fileName, options, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Sent:", fileName);
        }
      });
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//-------------------------------------DELETE OFFER--------------------------
const deleteOffer = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const remove = await Offers.findByIdAndRemove(req.params.id);
      // return res.send(remove)
      let image = remove.image;
      fs.unlink(image, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//----------------------------------ADD FAQ ----------------------------------------------------
const faq = async (req, res) => {
  try {
    // const auth = verifyToken(req, res);
    // if (auth.user_type === "admin") {
      faqs = new Faq({ question: req.body.question, answer: req.body.answer });
      await faqs.save();
      return res.send(faqs);
    // } else {
    //   return res.send("you don't have enough permissions");
    // }
  } catch (e) {
    return res.send("ERROR :", e);
  }
};
//-------------------------------SHOW FAQ -----------------------------------------------\
const showFaq = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin") {
      faqs = await Faq.find();
      return res.send(faqs);
    } else {
      return res.send("you don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//--------------------------------DELETE FAQ------------------------------------------
const deleteFaq = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin") {
      const remove = await Faq.findByIdAndRemove(req.params.id);
      return res.send(remove);
    } else {
      return res.send("you don't have enough permissions");
    }
  } catch (e) {
    return res.send(e);
  }
};
//-----------------------------UPDATE FAQ--------------------------------------------------
const updateFaq = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin") {
      const update = await Faq.findByIdAndUpdate(req.params.id, {
        question: req.body.question,
        answer: req.body.answer,
      });
      return res.send(update);
    } else {
      return res.send("you don't have any permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//------------------------------CREATE SERVICES---------------------------------------------
const service = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin" ||" ") {
      servic = new Services({
        services_name: req.body.services_name,
        description: req.body.description,
//image: req.file.path,
      });
      await servic.save();
      res.send(servic._id);
      let category_name = req.body.category_name;
      let m = [];
      category_name.forEach(myFunction);
      function myFunction(item) {
        sum = new Category({ category_name: item, services_id: servic._id });
        sum.save();
        m.push(sum);
      }
      console.log(m); // category _id
      //sub_category insert
      let n = req.body.n;
      m.forEach((k, index) => {
        n.forEach((i, index2) => {
          if (index == index2) {
            let arr = [];
            n[index2].forEach(myFunction);
            function myFunction(item) {
              sum = new Sub_Category({
                sub_category_name: item.sub_category_name,
                fess: item.fees,
                discount: item.discount,
                category_id: m[index],
              });
              sum.save();
              arr.push(sum);
            }
            console.log(arr);
          }
        });
      });
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    console.log(err);
  }
};
//------------------------------SHOW SERVICES----------------------------------------------------------
const showServices = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const services = await Services.find();
      return res.send(services);
    } else {
      return res.send("you are not admin");
    }
  } catch (err) {
    return res.send(err);
  }
};
//---------------------------------------------------Delete Services--------------------------------------------------------
const deleteServices = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const ServicesRemove = await Services.findByIdAndRemove(req.params.id);
      // return res.send(remove)
      res.send(ServicesRemove._id);
      let image = remove.image;
      fs.unlink(image, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      const categoryRemove = await Category.deleteMany({
        services_id: ServicesRemove,
      });
      let n = categoryRemove._id;
      n.forEach((k) => Sub_Category.deleteMany({ category_id: k }));
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};
//-------------------------------Query-----------------------------------------------------------------------

const insertQuery = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const query = new Query({
        name: req.body.name,
        email: req.body.email,
        query: req.body.query,
      });
      await query.save();
      return res.send(query);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (e) {
    return res.send(e);
  }
};

const showQuery = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const query = await Query.find();
      return res.send(query);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (e) {
    return res.send(e);
  }
};

const updateQuery = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const query = await Query.findByIdAndUpdate(req.params.id, {
        status: "resolved",
      });
      return res.send(query);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (error) {
    return res.send(error);
  }
};

// --------------------------------------------Clients ------------------------------------------------------

const showClients = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      clients = await Client.find();
      res.send(clients._id);
      return res.send(
        clients._id,
        clients.name,
        clients.email,
        clients.mobile_no,
        clients.createdAt
      );
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (e) {
    return res.send(e);
  }
};

const viewDetails = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const client = await Client.find();
      return res.send(client.name, client.mobile_no, client.email);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (e) {
    return res.send(e);
  }
};

// -------------------------------------Category ---------------------------------------------------------

const showCategory = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const category = await Category.find({ services_id: req.params.id });
      return res.send(category);
    } else {
      return res.send("You don't have enough permssions");
    }
  } catch (e) {
    return res.send(e);
  }
};

//--------------------------------------------Sub-Category--------------------------------------------

const showSubCategory = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const subCategory = await Sub_Category.find({
        category_id: req.params.id,
      });
      return res.send(subCategory);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (e) {
    return res.send(e);
  }
};
//----------------------------------------------------manage Application-----------------------------------------------
const manageApplication = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === "admin" || " ") {
      applicatiion = await Client.find()
        .select({
          createdAt: 1,
          services_id: 1,
          Transaction_Id: 1,
          status: 1,
          Amount_AED: 1,
          payment_mode: 1,
        })
        .papuleat({ servisec_id });
      return res.send(applicatiion);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};

//-----------------------------------------Application ----------------------------------------------------------------------

const OneApplication = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      var id = req.params.id;
      console.log(id);
      applicatiion = await Client.findById(id);
      return res.send(applicatiion);
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.send(err);
  }
};

const appointement = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const appointementDate = await Client.find({
        appointments: { $ne: null },
      }).select({
        name: 1,
        email: 1,
        mobile_no: 1,
        createdAt: 1,
        appointments: 1,
      });
      return res.json({ appointementDate });
    } else {
      return res.send("You don't have enough permissions");
    }
  } catch (err) {
    return res.json(err);
  }
};
//-------------------------------------------------payment-------------------------------------------------------------

const showPayment = async (req, res) => {
  try {
    const auth = verifyToken(req, res);
    if (auth.user_type === admin) {
      const payment = await Client.find()
        .select({
          createdAt: 1,
          Transaction_Id: 1,
          services_id: 1,
          name: 1,
          Payment_mode: 1,
          Amount_AED: 1,
          status: 1,
        })
        .populate("service_id", "service_name");
      return res.json(payment);
    } else {
      return res.json("You don't have enough permissions");
    }
  } catch (e) {
    return res.json(e);
  }
};


//------------------------------------------Overview----------------------------------------------------------------

const showAppointments = async(req, res)=> {
  try{
    const auth = verifyToken(req, res);
    if(auth.user_type === admin){
      const appoinment = await Client.find({
        status: { $ne : "Appointment Accepted"}
      });
      return res.json(appoinment);
    }
    else{
      return res.json("You don't have enough permissions");
    }
  }

  catch(e){
    return res.send(e);
  }
}





module.exports = {
  offer,
  showOffer,
  viewOffer,
  deleteOffer,
  faq,
  showFaq,
  deleteFaq,
  updateFaq,
  service,
  showServices,
  insertQuery,
  showQuery,
  updateQuery,
  showClients,
  viewDetails,
  showSubCategory,
  showCategory,
  manageApplication,
  deleteServices,
  OneApplication,
  appointement,
  showPayment,
  showAppointments
};
