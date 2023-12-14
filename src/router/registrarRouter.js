const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userModel = require("../model/userModel");
const studentGradeModel = require("../model/studentGrades");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/registrar-profile");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}${Math.random() * 10000}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.put(
  "/edit-registrar-profile",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        email,
        address,
        gender,
        registrarId,
        _id,
      } = req.body;

      if (req.file) {
        await userModel.findByIdAndUpdate(
          _id,
          { $set: { profile: req.file.path } },
          { new: true }
        );
      }

      const editRegistrar = await userModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            email,
            address,
            gender,
            registrarId,
          },
        },
        { new: true }
      );
      return res.json(editRegistrar);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/get-student-grades", async (req, res) => {
  try {
    const getStudentGrades = await studentGradeModel.find({});
    return res.json(getStudentGrades);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-user-profile/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const user = await userModel.findById(studentId);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/student-grades/:studentId", async (req, res) => {
  try {
    const grades = await studentGradeModel.find({
      studentId: req.params.studentId,
    });
    return res.json(grades);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
