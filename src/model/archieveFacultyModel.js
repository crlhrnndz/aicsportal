const mongoose  = require("mongoose");

const archieveFacultySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    facultyId: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    fullName: { type: String },
    gender: { type: String, required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNumber: { type: String },
    status: { type: String },
    role: { type: String },
    password: { type: String, required: true },
    selected: { type: Boolean },
    canUploadGrades: { type: Boolean },
  },
  {
    _id: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("archieveFaculty", archieveFacultySchema);
